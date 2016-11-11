# How to debug iOS Safari on Windows PC:
- Firefox Shift + F8 -> Opens WebIDE. Ctrl + Shift + J -> Opens browser console
- Needs Valence
- install iTunes (can be removed after, only need Apple Mobile Device Support)
- [a Ported iOS Webkit Debug Proxy for Windows](https://github.com/artygus/ios-webkit-debug-proxy-win32)
- Needs to be compiled, [a maybe compiled version](https://sourceforge.net/projects/ios-webkit-debug-proxy-win32/)
- Run ios-webkit-debug-proxy.exe, opens empty console
- WebIDE: click Safari, Firefox, and other WebViews on iOS
- Accept firewall
- If tabs not showing, on iOS device: Settings -> Safari -> Advanced -> Web Inspector (enable)
