(ns jump-form.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]))

(defn hello [req]
  {:status 200
   :body "Hello!"
   :headers {}})

(defn -main [port]
  (jetty/run-jetty hello
                   {:port (Integer. port)}))
