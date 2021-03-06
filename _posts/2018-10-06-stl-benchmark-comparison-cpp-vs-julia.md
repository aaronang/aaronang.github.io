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

### Update 1

I have received some feedback on the C++ implementation. The biggest problem with the C++ implementation was that it read one float at a time while it could actually read all floats to construct a triangle in one go. After this modification, it turns out that C++ is twice as fast!

```console
$ ./stl_benchmark
2018-10-06 12:35:31
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
ParseStl       429234 ns     409210 ns       1729
```

In microseconds:

| Language | Time       |
|----------|------------|
| C++      | 409.210 μs |
| Julia    | 815.896 μs |

Thank you all for the feedback! It was a fun and educational ride. The lesson here is that C++ is more performant than Julia when optimized. However, when a newcomer to C++ and Julia writes software, it is not unlikely that the Julia implementation will be as performant as the C++ implementation. In other words, I think more knowledge is required to write performant C++ than performant Julia.

### Update 2

I added a Python implementation for fun. Hopefully, I didn't make any disastrous
implementation mistakes in Python. If I did, please let me know.

The Python benchmark results:

```console
$ poetry run python benchmark.py
25150.930999999986 μs
```

Putting everything together:

| Language | Time       |
|----------|------------|
| C++      | 409.210 μs |
| Julia    | 815.896 μs |
| Python   | 25150.9 μs |

### Update 3

[Simon Danisch](https://twitter.com/SimonDanisch) contributed to the Julia code
and made it 4 times faster using Julia's C interface. I think it is kind of
cheating but it does showcase that you can optimize Julia to such a point that
it could be on par with the C++ implementation. It also made the Julia
implementation much simpler. The new results, shown below, indicate that Julia
is twice as fast again but I am pretty sure that the C++ implementation can
still be optimized which will probably make it either faster or just as fast.

| Language | Time       |
|----------|------------|
| C++      | 409.210 μs |
| Julia    | 211.641 μs |
| Python   | 25150.9 μs |

The lesson of this experiment is that a newcomer is very likely to write Julia
code that is more performant than the C++ code. However, when enough time and
effort is spent on optimizing both implementations, I think Julia can get fast
enough where other factors like productivity and library support will probably
play a more important role in deciding what language to go with.

Once again, I would like to thank the community for providing a lot of
insightful feedback. I never imagined learning so much from publishing
such a small scale experiment.