# entame-ticket

# Features


# Usage

## Environment variables

| Name                                | Required | Value            | Purpose                                 |
|-------------------------------------|----------|------------------|-----------------------------------------|
| `NODE_ENV`                          | true     |                  | 環境名                                  |
| `NPM_TOKEN`                         | true     |                  | npm トークン                            |
| `REDIS_HOST`                        | true     |                  | REDISホスト                             |
| `REDIS_PORT`                        | true     |                  | REDISポート                             |
| `REDIS_KEY`                         | true     |                  | REDISキー                               |
| `MOCOIN_API_ENDPOINT`               | true     |                  | MOCOIN API エンドポイント                 |
| `MOCOIN_CLIENT_ID_OAUTH2`           | true     |                  | OAUTH2クライアントID                     |
| `MOCOIN_CLIENT_SECRET_OAUTH2`       | true     |                  | OAUTH2クライアントSECRET                 |
| `MOCOIN_OAUTH2_SERVER_DOMAIN`       | true     |                  | OAUTH2認可サーバードメイン                |
| `MOCOIN_AUTH_REDIRECT_URI`          | true     |                  | サインインリダイレクトURL                 |
| `MOCOIN_AUTH_LOGUOT_URI`            | true     |                  | サインアウトリダイレクトURL               |
| `DEBUG`                             | false    | sskts-frontend:* | デバッグ                                |



# Build

ビルドは以下で実行できます。

```shell
npm run build
```

# Tests

構文チェックは以下で実行できます。

```shell
npm run check
```

