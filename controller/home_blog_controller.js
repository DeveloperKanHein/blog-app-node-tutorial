class HomeBlogController{
    static async home(req, res) {

        res.render('home.ejs');
    }
}

module.exports = HomeBlogController;