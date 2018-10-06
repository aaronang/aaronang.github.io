---
layout: post
title: "STL Benchmark Comparison: C++ vs. Julia"
description: "An experiment comparing C++ versus Julia from the performance perspective when parsing binary STL files."
keywords: "c++, julia, stl, benchmark"
---

It is not unusual to choose C++ as the programming language if you want
performance. When you have to deal with computational geometry and graphics, C++
seems to be a good choice because of the number of available libraries. C++ also
seems to be the favorite in the graphics research community. However, we
shouldn't ignore developers' productivity and we shouldn't lose sight of whether
we do systems programming or application development.

Today, I would like to discuss my first experiment comparing C++ versus Julia
from the performance perspective. I am doing this comparison because I am not
very excited about C++ and hear many good stories about Julia with respect to
performance and productivity. I am using STL parsing as the benchmark since most
of my work is related to computational geometry nowadays. The
[STL file format](https://en.wikipedia.org/wiki/STL_(file_format)) is a common
input when dealing with 3D models, represented as a collection of triangles.

## Results

In this experiment, I tried my best keeping the implementation in C++ and Julia
as identical as possible. For example, it would be unfair to compare a
parallelized implementation in C++ against a non-parallelized implementation in
Julia. The benchmark results are as follows.

C++:

```console
$ ./stl_benchmark
2018-10-05 22:44:31
Running ./stl_benchmark
Run on (8 X 2300 MHz CPU s)
CPU Caches:
  L1 Data 32K (x4)
  L1 Instruction 32K (x4)
  L2 Unified 262K (x4)
  L3 Unified 6291K (x1)
--------------------------------------------------
Benchmark           Time           CPU Iterations
--------------------------------------------------
ParseStl      1775819 ns    1747459 ns        381
```

Julia:

```console
julia> include("src/Benchmark.jl")
  815.896 μs (26 allocations: 769.47 KiB)
```

Converting the numbers to microseconds:

| Language | Time        |
|----------|-------------|
| C++      | 1747.459 μs |
| Julia    |  815.896 μs |

The benchmark results indicate that Julia is 2 times faster than C++ when parsing the
[NIST Additive Manufacturing Test Artifact](https://www.nist.gov/el/intelligent-systems-division-73500/production-systems-group/nist-additive-manufacturing-test).

## Conclusion

Developing software in C++ does not necessarily result in the fastest program. I
am very impressed with the fact that one of my first Julia programs is able to
run 2 times faster than the C++ implementation when parsing a binary STL file.
Note that I am neither an expert in C++ nor Julia and, therefore, I will remain
slightly skeptic and will keep experimenting --- more benchmark comparisons to
come.

Hope you enjoyed the article! Feel free to reach out to
[me](https://twitter.com/_aaronang) with comments, questions, and feedback. The
code that was used for the benchmark and all the steps to reproduce the
experiment can be found on [GitHub](https://github.com/aaronang/stl-benchmark).
