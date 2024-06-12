from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/streamers')
def submodule_index():
    return render_template('streamerPage.html')


@app.route("/streamers/obs", methods=["GET"])
def streamer_obs():
    return render_template('obs.html')


@app.route("/streamers/donate", methods=["GET"])
def streamer_donate():
    return render_template('donorPage.html')


@app.route("/streamers/history", methods=["GET"])
def streamer_history():
    return render_template('tipHistory.html')


@app.route("/streamers/preview", methods=["GET"])
def obs_preview():
    return render_template('obsPreview.html')

if __name__ == '__main__':
    app.run(debug=True)