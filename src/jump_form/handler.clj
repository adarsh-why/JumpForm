(ns jump-form.handler
  (:require [jump-form.model :as t]))

(defn handle-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/form.html")})

(defn handle-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/builder.html")})

(defn handle-send-json [req]
  (let [uuid  (:uuid (:route-params req))
        k (prn uuid)]
    {:status 200
     :headers {}
     :body (t/get-form uuid)}))

(defn handle-results [req]
  (let [uuid  (:uuid (:route-params req))
        k (prn uuid)]
    {:status 200
     :headers {}
     :body (t/get-results uuid)}))
