usage step:
1. checkout from 'master' branch
2. use node v14.15.3
3. npm install
4. npm run start

notes: 
- dont foget to run pokemon-node to get the data (localhost:3001)
- there is some issue when user wanna change pokemon name (state issue), when pokemon has original name and user should rename it twice, so rename pokemon will works
- because the rename feature use fibonacci sequence, when pokemon name changed to 1, when user click rename again it will still 1 because fibonacci sequence (0,1,1,2,3,5...), and when click rename again it will be 2 (example: pikachu-2)
