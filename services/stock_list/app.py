from flask import Flask, render_template, request
import requests

API_KEY = "w9mf7gILj9AZXwVPB2R07ELs07yzGngaUiYfhjjh"
SCRIDS_LIST = {
    "day_gainers",
    "day_losers",
    "most_actives",
    "most_shorted_stocks",
    "undervalued_growth_stocks",
}

app = Flask(__name__)

@app.route('/', methods=['GET'])
def page():
    count = request.args.get('count') or "15"
    scrIds = request.args.get('scrIds') or "day_gainers"
    r = requests.get(url = f"https://yfapi.net/ws/screeners/v1/finance/screener/predefined/saved?count={count}&scrIds={scrIds}", headers = {"X-API-KEY": API_KEY})
    result = r.json()["finance"]["result"][0]["quotes"]
    return render_template("home.html", count = count, scrIds = scrIds, scrIds_list = SCRIDS_LIST, result = result)

def shorten_number(number):
    if number > 1000000000000:
        return f"{round(number/1000000000000, 3)}T"
    elif number > 1000000000:
        return f"{round(number/1000000000, 3)}B"
    elif number > 1000000:
        return f"{round(number/1000000, 3)}M"
    else:
        return f"{number}"

app.jinja_env.globals.update(shorten_number=shorten_number)

if __name__ == '__main__':
    app.run()