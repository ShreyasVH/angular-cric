PROJECT_NAME=$(jq -r 'keys_unsorted[0]' <(jq '.projects' angular.json))
cd dist/$PROJECT_NAME

if ! lsof -i :$PORT > /dev/null; then
    echo "Starting"
    http-server > server.log 2>&1 &
fi

cd ../../
