esbuild resolvers/createPost.js --bundle --outdir=build --external:"@aws-appsync/utils" --format=esm
esbuild resolvers/createAuthor.js --bundle --outdir=build --external:"@aws-appsync/utils" --format=esm
esbuild resolvers/updateAuthor.js --bundle --outdir=build --external:"@aws-appsync/utils" --format=esm
