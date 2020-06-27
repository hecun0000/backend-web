/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */

const dev = {
  hostUrl: 'http://118.24.22.88:8888/',
  baseUrl: '/',
  routerMode: 'hash'
}

const prod = {
  hostUrl: 'http://118.24.22.88:8888/',
  baseUrl: '/api',
  routerMode: 'hash'
}

export default process.env.NODE_ENV === 'development' ? dev : prod
