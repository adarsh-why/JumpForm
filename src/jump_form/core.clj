(ns jump-form.core
  (:gen-class)
  (:require [jump-form.handler :refer [handle-form
                                       handle-send-json
                                       handle-results
                                       handle-builder
                                       handle-home
                                       handle-results-page
                                       handle-create-form
                                       handle-post-results]]
            [jump-form.model :as model])
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [compojure.core :refer [defroutes ANY GET POST PUT DELETE]]
            [compojure.route :refer [not-found]]
            [ring.handler.dump :refer [handle-dump]]
            [ring.util.response :refer [response]]
            [ring.util.request :refer [body-string]]))

(defroutes routes
  (GET "/" [] handle-home)
  (GET "/builder" [] handle-builder)
  (GET "/:uuid" [] handle-form)
  (GET "/results/:uuid" [] handle-results-page)
  (GET "/request" [] handle-dump)
  (GET "get-json/:uuid" [] handle-send-json)
  (GET "/get-results/:uuid" [] handle-results)
  (POST "/create-form" [] handle-create-form)
  (POST "/post-results/:uuid" [] handle-post-results)
  (not-found "Page not found."))

(defn wrap-server [hdlr]
  (fn [req]
    (assoc-in (hdlr req) [:headers "Server"] "jump-form")))

(defn wrap-body-string [handler]
  (fn [request]
    (let [body-str (body-string request)]
      (handler (assoc request :body-str body-str)))))

(def app
  (wrap-body-string
    (wrap-server
      (wrap-resource
        (wrap-params
          routes)
        "static"))))

(defn -main [port]
  (jetty/run-jetty app
                   {:port (Integer. port)}))

(defn -dev-main [port]
  (jetty/run-jetty (wrap-reload #'app)
                   {:port (Integer. port)}))
