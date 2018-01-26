(ns jump-form.model
  (:require [taoensso.carmine :as car :refer (wcar)]))


(def server-connection {:pool {}
                        :spec {:host     "localhost"
                               :port     6379
                               :timeout  4000}})

(defn generate-uuid []
  (str (java.util.UUID/randomUUID)))

;;Get/Set Helper Redis Functions---------------

(defn set-data [k v]
  (wcar server-connection (car/set k v)))

(defn get-data [k]
  (wcar server-connection
        (car/get k)))

;; Form DB----------------------



;; Results DB--------------------
