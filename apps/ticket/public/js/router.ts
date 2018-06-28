var ticketRoutes = {
    enter: function (route) {
        this.page = route.route;
        this.file = route.file;
        this.pageInit();
    },
    routes: {
        public: {
            path: '',
            routes: {
                default: {path: '', file: null},
                home: {file: null}
            }
        },
        private: {
            path: '',
            enter: function (route) {
            },
            routes: {
            }
        }
    }
};


