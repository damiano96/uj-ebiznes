package controllers

import (
	"context"
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"net/http"
)

var (
	googleOauthConfig = oauth2.Config{
		ClientID:     "670024986582-q4n5ns2gv8n62nv6qdn99hoqfjust9tv.apps.googleusercontent.com",
		ClientSecret: "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",
		RedirectURL:  "http://localhost:1323/oauth/callback",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}
)

func GetOAuthLogin(c echo.Context) error {
	url := googleOauthConfig.AuthCodeURL("random-state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusFound, url)
}

func GetOAuthCallback(c echo.Context) error {
	code := c.QueryParam("code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return err
	}

	client := googleOauthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	userInfo := struct {
		ID    string `json:"id"`
		Email string `json:"email"`
	}{}
	if err := c.JSONPretty(http.StatusOK, userInfo, "  "); err != nil {
		return err
	}

	return nil
}
