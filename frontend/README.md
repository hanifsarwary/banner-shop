# Banner Shop Frontend


Repo link: [http://github.com/hanifsarwary/banner-shop/](http://github.com/hanifsarwary/banner-shop/)

### Project Setup:
```bash
git clone https://github.com/hanifsarwary/banner-shop.git
cd banner-shop/frontend
npm install
npm start # Open http://localhost:3000 to view it in the browser
```

### Project Deployment:
SSH into GCP
```bash
cd banner-shop/frontend
npm install
npm run build
```


### First time setup
```bash
cd /etc/nginx/sites-available/
sudo vi bannershop_ngnix.conf # change the settings
sudo /etc/init.d/nginx -t # Test configurations
sudo /etc/init.d/nginx restart

# Use full commands
sudo systemctl status nginx.service
sudo systemctl start nginx.service
sudo systemctl restart nginx.service

# Logs
tail -f /var/log/nginx/access.log
```
