import Http from '@services/Http'
import { isIOS } from '@utils/Env'

export class Version {
  static img() {
    return Http.get('/app/version').then(res => {
      const device = isIOS ? 'ios' : 'android'
      const item = res.find(it => it.device === device)
      return {
        ...item,
        id: item.ID,
        createTime: item.CreatedAt,
        device,
        version: item.version_number,
        isUse: item.is_use,
        versionMajor: item.version_major,
        downloadUrl: item.download_url,
      }
    })
  }
}
