curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs
