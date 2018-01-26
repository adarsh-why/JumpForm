(ns jump-form.model
  (:require [taoensso.carmine :as car :refer (wcar)]))


(def server-connection {:pool {}
                        :spec {:host     "localhost"
                               :port     6379
                               :timeout  4000}})

(defn generate-uuid []
  (str (java.util.UUID/randomUUID)))

;;Get/Set Helper Redis Functions---------------

(defmacro wcar* [& body] `(car/wcar server-connection ~@body))

;; Form DB----------------------

(defn add-form [form-json]
  (wcar* (car/hset "form" (generate-uuid) form-json)))

(defn get-form [uuid]
  (wcar* (car/hget "form" uuid)))

;; Results DB--------------------

(defn add-results [uuid results-json]
  (wcar* (car/hset "results" uuid results-json)))

(defn get-results [uuid]
  (wcar* (car/hget "results" uuid)))
