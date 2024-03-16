# TTC-Bot
 Web server and Discord Bot for TTC

## Networking Web
```
+ My Computer (Main Server/Test Server/Replay Server/Web Server/Dex Site)
|
+ Github - Main Server - Test Server - Replay Server + Web Server + Dex Site
|              |             |                            |
|          Main Server   Test Server              Utilities Server
|              |             |                            |
|              |             |             +--------------+--------------+
|            Replay        Replay          |              |              |
|              |             |             |              |              |
|              |             |        Replay Server    Web Server      Dex Site      MongoDB
|              +-------------+-----------> +              |                             |
|              |             |             |              |                             |
|           Sprites          |             +---Save replay to Database----------------> +
|              +-----------> +             |              |                             |
|              |             |             +-Send Alert-> +                             |
|              |             |             |              |                             |
|              |             |             |              +----------Get Replay-------> +
|              |             |             |              |                             |
|              |             |             |              + <------Send Replay Data-----+
|              |             |             |              |                             |
+--------------+-------------+-------------+--------------+-----------------------------+

```