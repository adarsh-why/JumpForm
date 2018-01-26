(ns jump-form.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.reload :refer [wrap-reload]]))

(defn hello [req]
  {:status 200
   :body "Hello!"
   :headers {}})

(defn -main [port]
  (jetty/run-jetty hello
                   {:port (Integer. port)}))

(defn -dev-main [port]
  (jetty/run-jetty (wrap-reload #'hello)
                   {:port (Integer. port)}))
