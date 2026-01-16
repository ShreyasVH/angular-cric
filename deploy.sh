PROJECT_NAME=$(jq -r 'keys_unsorted[0]' <(jq '.projects' angular.json))
cd dist/$PROJECT_NAME/browser

if ! lsof -i :$PORT > /dev/null; then
    echo "Starting"
    serve -s . > server.log 2>&1 &
fi

cd ../../
