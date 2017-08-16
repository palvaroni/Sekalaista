'''
Run platform specific shell command with
real-time console output. Exit after subprocess
completition.
'''

import platform
import subprocess
import sys

x = "Hello on platform "+platform.system()

# Run shell echo by platform
proc = {
  'Windows': lambda x: subprocess.Popen(
    "echo "+ x + " && ping -n 006 127.0.0.1 >nul && echo the end", 
    shell=True, 
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
  ),
  'Linux': lambda x: subprocess.Popen(
    "echo " + x + " && sleep 5 && echo the end", 
    shell=True, 
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
  ),
}[platform.system()](x)

while proc.poll() is None:
    out = proc.stdout.readline()
    sys.stdout.write((out).decode('utf-8'))
    sys.stdout.flush()
