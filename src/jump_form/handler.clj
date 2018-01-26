(ns jump-form.handler)

(defn handle-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/form.html")})

(defn handle-send-json [req]
  (let [uuid  (:uuid (:route-params req))
        k (prn uuid)]
    {:status 200
     :headers {}
     :body (slurp "test/test.json")}))
