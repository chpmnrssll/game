define([], function () {
    "use strict";

    return Backbone.Model.extend({
        initialize : function () {
            var self = this;
            $.ajax({
                type : "GET",
                url : window.App.apiUrl + "oauth2/client/Backbone v1",
                success : function (data) {
                    self.set({
                        clientId : data.id,
                        clientSecret : data.secret
                    });
                }
            });
        },
        expired : function () {
            return Math.round((Date.now() - this.get("created")) / 1000) > this.get("expiresIn");
        },
        getAccessToken : function (options) {
            var self = this;
            options = options ? options : {};
            $.ajax({
                type : "POST",
                url : window.App.apiUrl + "oauth2/token",
                headers : {
                    "Authorization" : "Basic " + btoa(self.get("clientId") + ":" + self.get("clientSecret"))
                },
                data : {
                    grant_type : "password",
                    username : self.get("username"),
                    password : self.get("password")
                },
                success : function (data, status, req) {
                    self.set({
                        tokenType : data.token_type,
                        accessToken : data.access_token,
                        refreshToken : data.refresh_token,
                        expiresIn : data.expires_in,
                        created : Date.now()
                    });
                    if (options.success) {
                        options.success();
                    }
                },
                error : function (req, status, error) {
                    if (options.error) {
                        options.error();
                    }
                }
            });
        },
        refreshAccessToken : function (options) {
            var self = this;
            options = options ? options : {};
            $.ajax({
                type : "POST",
                url : window.App.apiUrl + "oauth2/token",
                data : {
                    grant_type : "refresh_token",
                    client_id : self.get("clientId"),
                    client_secret : self.get("clientSecret"),
                    refresh_token : self.get("refreshToken")
                },
                success : function (data, status, req) {
                    self.set({
                        tokenType : data.token_type,
                        accessToken : data.access_token,
                        refreshToken : data.refresh_token,
                        expiresIn : data.expires_in,
                        created : Date.now()
                    });
                    if (options.success) {
                        options.success();
                    }
                },
                error : function (req, status, error) {
                    if (options.error) {
                        options.error();
                    }
                }
            });
        }
    });
});
