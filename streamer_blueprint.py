from flask import Blueprint, render_template

streamer_blueprint = Blueprint('streamer', __name__,
                               template_folder='templates',
                               static_folder='static',
                               static_url_path='/frontends/static')


@streamer_blueprint.route('/streamers')
def submodule_index():
    return render_template('streamerPage.html')


@streamer_blueprint.route("/streamers/obs", methods=["GET"])
def streamer_obs():
    return render_template('obs.html')


@streamer_blueprint.route("/streamers/donate", methods=["GET"])
def streamer_donate():
    return render_template('donorPage.html')


@streamer_blueprint.route("/streamers/history", methods=["GET"])
def streamer_history():
    return render_template('tipHistory.html')


@streamer_blueprint.route("/streamers/preview", methods=["GET"])
def obs_preview():
    return render_template('obsPreview.html')

