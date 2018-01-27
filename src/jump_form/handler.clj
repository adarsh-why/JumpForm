(ns jump-form.handler
  (:require [jump-form.model :as t]
            [clojure.data.json :as json]))

(defn handle-form [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/form.html")})

(defn handle-results-page [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/results.html")})

(defn handle-builder [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/builder.html")})

(defn handle-home [req]
  {:status 200
   :headers {}
   :body (slurp "resources/static/home.html")})

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

;;--------------------Helpers------------

;;-------Under Construction-----------

(defn add-result-zeros [form-item option-count]
  )

(defn add-initial-results [uuid form-data]
  (let [test-form (json/read-str (slurp "test/test.json"))
        test-form-vec (into [] test-form)
        get-options (map  #(get-in % [1 "options"]) test-form-vec)
        options-count (map count get-options)
        results-form-vec (map add-result-zeros
                              test-form-vec options-count)]
    ;;(println test-form)
    ;; (println test-form-vec)
    ;; (println get-options)
    ;;(println options-count)
    ))


(defn update-results [uuid result-data]
  )
;;-------------------------------

(defn handle-post-results [req]
  (let [uuid  (:uuid (:route-params req))
        body-str  (get req :body-str)
        body (json/read-str body-str)
        results-data (get body "answers")
        update-results (update-results uuid results-data)]
    (println body-str results-data)))

(defn handle-create-form [req]
  (let [body-str (get req :body-str)
        body (json/read-str body-str)
        form-data (get body "formData")
        json-form-data (json/write-str form-data)
        n-uuid (t/generate-uuid)
        add-form (t/add-form n-uuid json-form-data)
        add-initial-results (add-initial-results n-uuid form-data)]
    {:status 200
     :headers {}
     :body (str "localhost:8000/" n-uuid)}))
