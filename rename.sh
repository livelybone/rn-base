app_name=$1
old_app_name=$(cat app.json | awk -F \" '/name/{print $4}')

printf "New App name: %s\n" "$app_name"
printf "Old App name: %s\n\n" "$old_app_name"


if [ -z "$app_name" ]; then
  printf "Error: Please enter the new App name\n";
  exit 1;
elif [ "$app_name" = "$old_app_name" ]; then
  printf "Error: The App name do not changed!\n";
  exit 1;
fi


ignore_dirs=("node_modules" ".gradle" ".idea" ".git" "build" "Pods" "." "..")

ignore_file_types=("png" "jpg" "jpeg" "mp3" "mp4" "keystore" "jar")

should_ignore() {
  local arr=${2:-${ignore_dirs[*]}}
  for dir in ${arr[*]}
  do
    if [ "$1" == "$dir" ]; then
      return 1
    fi
  done
  return 0
}

file_count=0
dir_count=0
LC_CTYPE=C
LANG=C
lookup_file() {
  for name in $(ls -a $1)
  do
    local new_name=${name//${old_app_name}/${app_name}}
    if [ "$1" == "." ]; then
      local file=$name
      local new_file=$new_name
    else
      local file="$1/$name"
      local new_file="$1/$new_name"
    fi

    if [ -f "$file" ]; then
      #printf "file: %s\n" $file
      should_ignore "${file##*.}" "${ignore_file_types[*]}"
      if [ "$?" != "1" ]; then
        sed -i '' "s/$old_app_name/$app_name/g" "$file"
      fi
      if [ "$file" != "$new_file" ]; then
        mv "$file" "$new_file"
        file_count=$((file_count + 1))
      fi
    elif [ -d "$file" ]; then
      should_ignore "$name"
      if [ "$?" != "1" ]; then
        lookup_file "$file"

        if [ "$file" != "$new_file" ]; then
          mv "$file" "$new_file"
          dir_count=$((dir_count + 1))
        fi
      fi
    fi
  done
}

lookup_file "."

printf "\nRenamed %d files and %d directories, and edit content of some files\n\n" $file_count $dir_count
