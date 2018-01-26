(ns jump-form.handler)

(println (slurp "resources/static/index.html"))

(defn handle-dummy-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/index.html")})
