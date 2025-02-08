### build new progect
```bash
dotnet new webapi --use-controllers -o nameProject
```

```bash
 dotnet build
 ```

### migrations
 ```bash
     dotnet ef migrations add Initial
     dotnet ef database update
     dotnet ef migrations list
```
## open api swagger
 ```bash
 dotnet watch run
 ```
