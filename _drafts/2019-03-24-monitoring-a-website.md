---
layout: post
title: "Monitoring a website"
description: ""
keywords: ""
---

In this article, I am investigating how one would monitor a large-scale website,
like LinkedIn, Google, Twitter. This article will mostly be a note to myself
while learning more about this topic. Please question everything that is written
down here. I think that's what everyone should be doing anyway. To guide the
process, we will try to answer the following main question:

> What is critical in monitoring a large website?

## Why monitor?

We provide services to customers who have expectations. One of the expectations
is that the service we provide is reliable. To ensure reliability, we have to
prevent errors in the system. For example, when the saturation of a service
component is at its peak, the service component could be oversaturated and
result in higher response times. This is something we would want to prevent and,
therefore, we might want to consider scaling this service component such that
the saturation lowers to its optimal saturation point, at which it is intended
to perform well.

Another example is that a service is not responding correctly. However, without
monitoring we wouldn't be able to catch these errors besides receiving many
complaints from customers.

It becomes apparent that to become a reliable service provider we need to
monitor our systems.

In addition, monitoring is also important for doing post-mortems. Whenever
something went wrong, it is important to investigate the root cause. If the root
cause isn't investigated, how could we prevent the same error in the future?

## What to monitor?

According to
[Google's Site Reliability Engineering book](https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/#xref_monitoring_golden-signals),
there are four metrics that the authors call _the four golden signals_:

- Latency: How much time does it take to complete a request?
- Traffic: How much demand is being placed on the system?
- Errors: What fraction of the requests fail?
- Saturation: How "full" is a service?

According to
[Datadog's Monitoring 101 article](https://www.datadoghq.com/blog/monitoring-101-collecting-data/#metrics),
there are two metric categories:

- Work metrics
  - Throughput: This is similar to what Google calls _traffic_.
  - Success: What fraction of the requests succeed?
  - Error: What fraction of the requests fail?
  - Performance: How efficiently is a component doing its work? _Latency_ is a
    common performance metric.
- Resource metrics
  - Utilization: How much is a resource being utilized?
  - Saturation: How much of work isn't being serviced yet?
  - Error
  - Availability

Google describes _saturation_ as how "full" a service is while Datadog describes
it as the amount of work that a service cannot yet service. I wonder what the
difference is between utilization and saturation according to Google's
saturation definition.

Besides collecting these metrics frequently, it is important to monitor events
too, that is, collecting logging information. Events are important to collect
such that errors can be further investigated. How would we otherwise be able to
figure out what exactly went wrong at a point in time?

## How to monitor?

As we have discussed before, it is important to continuously collect metrics and
log events. For this reason, we will walk through the necessary steps to set up
monitoring.

First of all, define the requirements of monitoring. What metrics do we want to
collect? What events do we want to collect? According to Google, the bare
minimum should be latency, traffic, errors and saturation. We might want to
prioritize the metrics such that we can implement monitoring incrementally. I
imagine that when we implement monitoring, we would want to focus on
implementing the whole monitoring pipeline first for one metric and then start
adding new metrics.

Second, monitoring has always been important and, therefore, there exists plenty
of open source monitoring frameworks and third-party services that focus solely
on monitoring. For this reason, the second step in setting up monitoring would
be to figure out what existing solution to use. Probably a series of articles
can be written on what the advantages and disadvantages are of each existing
monitoring solution.

Third, think about the monitoring architecture. Very likely, every running
service will have an additional agent installed that can measure system metrics
like CPU usage and memory usage. Then, that data will be sent to a processing
pipeline that can do filtering and formatting. This processing pipeline will
probably be distributed and have a master-worker model, where the master nodes
will delegate the work to the available worker nodes. Once a worker node has
processed the data, it should store the data in a distributed database. Also, we
would want to set up some real-time visualization dashboard.

Finally, implementing the monitoring solution. I might write a separate article
in which I experiment with setting up monitoring using the
[ELK stack](https://www.elastic.co/elk-stack) in a Docker environment.

## Final words

In this article, we explored the concept of monitoring. Monitoring is a
necessity if we want to provide reliable services to customers. At the bare
minimum, we should be measuring latency, traffic, errors and saturation.
