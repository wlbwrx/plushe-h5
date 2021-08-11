export const platformId = (location.host.includes('geemart') && 2) || (location.host.includes('bondot') && 3) || 1

export const title = (platformId == 2 && 'GeeMart') || (platformId == 3 && 'Bondot') || 'Plushe' // 修改标题

