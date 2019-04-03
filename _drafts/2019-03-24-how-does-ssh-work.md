---
layout: post
title: "How does SSH work"
description: ""
keywords: ""
---

In this article, I will try to explain how SSH work under the hood to the best
of my knowledge.

> What happens when we run `ssh username@hostname`?

For the explanation, I will assume a 4-layer model: link, network, transport,
application.

1. DNS look up to figure out the IP address of a domain:
   1. OS cache
   2. Router cache
   3. ISP cache
   4. Recursive DNS server
      1. Root DNS server
      2. TLD DNS server
      3. Autoritative DNS server
   Returns public address.
2. Set up TCP connection through 3-way handshake: SYN, SYN + ACK, ACK
    1. Generate IP packet that includes: source IP, destination IP
    2. Encapsulate in ethernet frame that includes: source MAC, destination MAC
3. Send HTTP request
