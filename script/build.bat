call pnpm run build
call netlify deploy --prod -d ./dist --message "%NETLIFY_MESSAGE%"
