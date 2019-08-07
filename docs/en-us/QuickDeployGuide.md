# Quick Deploy Guide
This is a step-by-step guide which can teaches you deploy IFS RSVP Bot by your self.

You can deploy a IFS RSVP Bot for free in your Heroku [FN 1], and the bot deployed with this guide is full-powered. If you want some customized feature, you may deploy it by your self, but it is still recommended that read this guide first.

## Prepare for Airtable
You need a Airtable account. If you havn't a account for Airtable, click here to sign up.

[Visit the sample base](https://airtable.com/invite/l?inviteId=invHAheLd4lx9hWiI&inviteToken=f23d0248c93fe1e058d2da07470b44f6f8788d0ade9a8033885595d2d2e82787), then click “Add a workspace” in “Bases” page (your Airtable homepage) to create a workspace. You can name it as your preference.

![A sample for new workspace](https://i.imgur.com/VjKJ0et.png)

Click the arrow located in the right-bottom of “Base Sample” icon, then click “Duplicate base”. Choose the workspace you just created. Do not forget to un-tick the “Duplicate records” option.

![Copy base](https://i.imgur.com/puxE12J.png)

Go to the base duplicated by you. Edit the **sheet** name as the name of city by click “Rename table” option. Also, you can edit the base name as your own preference.

![Edit sheet name](https://i.imgur.com/lxpozq6.png)

Next. [Go to account settings in Airtable](https://airtable.com/account), Click “Generate API Key”, keep your personal API key to a safe area for later steps.


[Go to API documents of Airtable](https://airtable.com/api), find the base duplicated.

::: tip Which base is the target base?
If you doesn't edit the name of new base, it should be “Base Sample Copy”.
:::

Find the base ID with this image. Also, it can be found on URL box or Omni box.

![Get base ID](https://i.imgur.com/5zPDjFQ.png)

## Create a Telegram bot
Talk to [BotFather](https://t.me/botfather) and request for a new bot with `/newbot` command. BotFather will give you a bot token seems like `123456:1234567890ABCDEFGabcdefg` after the new bot created.

Then, the PoCs belonging to each faction need to chat with [ID Bot](https://t.me/myidbot) or [get id](https://t.me/get_id_bot) bot. Both will reply the Telegram ID in number (like `Your Chat ID = 000000`).

## Deploy to Heroku
Click “Deploy to Heroku” button on [project homepage](https://github.com/Astrian/IFS-RSVP-Bot), then fill in all those information:

- `AIRTABLE_TOKEN`: Your Airtable API key.
- `BASE_ID`: The base ID belonged to the target base.
- `DOMAIN`：Fill in the `App name` field first (at the top of the form), then, fill `https://<App name>.herokuapp.com` in this field. **Don't add `/` at the end of the URL.**
- `IFS_INFO`: Fill the JSON including your IFS information. 
- `RANDOM_ADDRESS`: Start with `/`, then input some random string fit to URL standard.
- `TELEGRAM_TOKEN`: The bot token given by BotFather.

::: tip I haven't Heroku account yet...
Don't worry. Heroku will redirect to sign-up page after you click the button, and you can create a Heroku account with it.
:::

The sample of `IFS_INFO`:

```json
[{"location":"Mojave","enlpoc":[123456,789012],"respoc":[345678,901234]}]
```

```json
[{"location":"El Capiton","enlpoc":[123456],"respoc":[789012]},{"location":"Yosemite","enlpoc":[345678],"respoc":[901234]}]
```

::: tip About the location field
IFS RSVP Bot supports multiple IFS events at the same time. The bot will identify different event by `location` field, and this field should be same as the **sheet** name (not the base name).
:::

Then, the PoCs can send `/start` command to the bot created. If the bot reply a welcome message, the config is all comleted. 🎉

## Next...
In the next part, we should import the RSVP list of First Saturday event.

## Foot note

1. The free service of Heroku has some restricitions, for example, limit running time in a period, 5 apps in your accounts (can be canceled with free credit card verification), etc. However, in theory, the free service is enough for bot running.