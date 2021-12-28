echo "Deploying to reg.ru u1489690";
echo "";
read -p "Commit message:" message;
if [ -z "$message" ]; then
    echo "Commiting all changes with comment: api";
    echo "And pushing to flowers.app.api master";
    git add . && git commit -m "api" && git push flowers.app.api master;
else
    echo "Commiting all changes with comment: $message";
    echo "And pushing to flowers.app.api master";
    git add . && git commit -m "$message" && git push flowers.app.api master;
fi
ssh u1489690@"server71.hosting.reg.ru" "cd ~/www/api.flowers.app && git2192 pull flowers.app.api master";