(ns jump-form.handler
  (:require [jump-form.model :as t]
            [clojure.data.json :as json]))

(defn handle-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/form.html")})

(defn handle-builder [req]
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

(defn handle-post-results [req]
  (let [body-str  (get req :body-str)
        body (json/read-str body-str)
        results (get body "answers")]
    (println body-str results)))

(defn handle-create-form [req]
  (let [body-str (get req :body-str)
        body (json/read-str body-str)
        form-data (get body "formData")
        json-form-data (json/write-str form-data)
        n-uuid (t/generate-uuid)
        add-form (t/add-form n-uuid json-form-data)
        ]
    {:status 200
     :headers {}
     :body (str "localhost:8000/" n-uuid)}))
