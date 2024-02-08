module.exports = {
  output: 'standalone',
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },{
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "icon-library.azurewebsites.net",
      },
    ],
  },
}