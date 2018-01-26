(ns jump-form.core
  (:gen-class)
  (:require [jump-form.handler :refer [handle-form
                                       handle-send-json]])
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [compojure.core :refer [defroutes ANY GET POST PUT DELETE]]
            [compojure.route :refer [not-found]]
            [ring.handler.dump :refer [handle-dump]]))

(defroutes routes
  (GET "/:uuid" [] handle-form)
  (GET "/request" [] handle-dump)
  (GET "/get-json/:uuid" [] handle-send-json)
  (not-found "Page not found."))

(defn wrap-server [hdlr]
  (fn [req]
    (assoc-in (hdlr req) [:headers "Server"] "jump-form")))

(def app
  (wrap-server
    (wrap-resource
      (wrap-params
        routes)
      "static")))

(defn -main [port]
  (jetty/run-jetty app
                   {:port (Integer. port)}))

(defn -dev-main [port]
  (jetty/run-jetty (wrap-reload #'app)
                   {:port (Integer. port)}))
