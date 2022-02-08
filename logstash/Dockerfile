FROM docker.elastic.co/logstash/logstash:7.17.0
RUN rm -f /usr/share/logstash/pipeline/logstash.conf
ADD pipeline/logstash.conf /usr/share/logstash/pipeline/logstash.conf