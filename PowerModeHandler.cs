using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Microsoft.Win32;

public class PowerModeHandler : NativeWindow, IDisposable
{
    public EventHandler<PowerModeChangedEventArgs> PowerModeChanged;

    private const int DEVICE_NOTIFY_WINDOW_HANDLE = 0x00000000;
    private static Guid GUID_MONITOR_POWER_ON = new Guid("02731015-4510-4526-99E6-E5A17EBD1AEA");

    [DllImport("user32.dll", SetLastError = true)]
    private static extern IntPtr RegisterPowerSettingNotification(IntPtr hRecipient, ref Guid PowerSettingGuid, int Flags);

    [DllImport("user32.dll", SetLastError = true)]
    private static extern bool UnregisterPowerSettingNotification(IntPtr Handle);

    private IntPtr _notificationHandle;

    public PowerModeHandler()
    {
        CreateHandle(new CreateParams());
        _notificationHandle = RegisterPowerSettingNotification(Handle, ref GUID_MONITOR_POWER_ON, DEVICE_NOTIFY_WINDOW_HANDLE);

        if (_notificationHandle == IntPtr.Zero)
        {
            throw new InvalidOperationException("Failed to register power setting notification.");
        }
    }

    protected override void WndProc(ref Message m)
    {
        const int WM_POWERBROADCAST = 0x0218;
        const int PBT_POWERSETTINGCHANGE = 0x8013;

        if (m.Msg == WM_POWERBROADCAST && m.WParam.ToInt32() == PBT_POWERSETTINGCHANGE)
        {
            POWERBROADCAST_SETTING setting = (POWERBROADCAST_SETTING)Marshal.PtrToStructure(m.LParam, typeof(POWERBROADCAST_SETTING));
            if (setting.PowerSetting == GUID_MONITOR_POWER_ON)
            {
                if (setting.DataLength > 0 && setting.Data[0] == 0)
                {
                    // Monitor is off (system is entering low-power state)
                    HandleSystemSuspend();
                }
                else if (setting.DataLength > 0 && setting.Data[0] != 0)
                {
                    // Monitor is on (system is resuming from low-power state)
                    HandleSystemResume();
                }
            }
        }
        base.WndProc(ref m);
    }

    private void HandleSystemSuspend()
    {
        PowerModeChanged?.Invoke(this, new PowerModeChangedEventArgs(PowerModes.Suspend));
    }

    private void HandleSystemResume()
    {
        PowerModeChanged?.Invoke(this, new PowerModeChangedEventArgs(PowerModes.Resume));
    }

    private void HandlePowerModeChanged(object sender, PowerModeChangedEventArgs args)
    {
        PowerModeChanged?.Invoke(sender, args);
    }

    public void Dispose()
    {
        UnregisterPowerSettingNotification(_notificationHandle);
        DestroyHandle();
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct POWERBROADCAST_SETTING
    {
        public Guid PowerSetting;
        public int DataLength;
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 1)]
        public byte[] Data;
    }
}
