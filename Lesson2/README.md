# Скрипт принимает данные запроса из адресной строки браузера

## Пример данных для скрипта

1. http://localhost:3000/?url=http://rozetka.com.ua&maxLinks=200&selector=.g-title

2. http://localhost:3000/?url=https://dou.ua/&maxLinks=100&selector=.comment

3. http://localhost:3000/?url=http://webscraper.io/&maxLinks=10&selector=.caption

## Вызов из консоли

./bin/cli --url=URL --selector=SELECTOR --links=NUMBER
