(ns jump-form.handler)

(defn handle-dummy-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/index.html")})
