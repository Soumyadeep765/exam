# Tutorial: Number System

> **Subject:** Mathematics | **NTPC Weightage:** 3–4 questions per CBT 1  
> **Difficulty:** Easy–Moderate | **Priority:** ★★★★★  
> **Last Updated:** June 2026

---

## 1. Theory

**Number System** covers properties of numbers, divisibility, LCM, HCF, remainders, and unit digits. Foundation for all arithmetic.

---

## 2. Formulas

| Concept | Formula |
|---------|---------|
| LCM × HCF | = Product of two numbers (for 2 numbers) |
| LCM of fractions | LCM(num)/HCF(den) |
| HCF of fractions | HCF(num)/LCM(den) |
| LCM of two numbers | (a × b) / HCF(a,b) |
| Remainder theorem | Dividend = Divisor × Quotient + Remainder |
| Unit digit of aⁿ | Cycle of 4 for most bases (2,3,7,8) |
| Divisibility by 3 | Sum of digits divisible by 3 |
| Divisibility by 9 | Sum of digits divisible by 9 |
| Divisibility by 11 | Alternating sum divisible by 11 |
| Number of factors | If N = p^a × q^b, factors = (a+1)(b+1) |
| Sum of factors | (p^(a+1)−1)/(p−1) × (q^(b+1)−1)/(q−1) |

### Unit Digit Cycles
| Base | Cycle (unit digits) | Period |
|------|---------------------|--------|
| 2 | 2,4,8,6 | 4 |
| 3 | 3,9,7,1 | 4 |
| 7 | 7,9,3,1 | 4 |
| 8 | 8,4,2,6 | 4 |
| 4 | 4,6 | 2 |
| 9 | 9,1 | 2 |

---

## 3. Examples

### Example 1: LCM & HCF
**Q:** LCM of 12 and 18? HCF?  
**Solution:** HCF = 6. LCM = (12×18)/6 = **36**

### Example 2: Unit Digit
**Q:** Unit digit of 7^83?  
**Solution:** 83 mod 4 = 3. Cycle: 7,9,3,1. 3rd position = **3**

### Example 3: Remainder
**Q:** Remainder when 17^23 is divided by 5?  
**Solution:** 17 mod 5 = 2. 2^23 mod 5. Cycle of 2: 2,4,3,1 (period 4). 23 mod 4 = 3. 2³=8 mod 5 = **3**

### Example 4: LCM Word Problem
**Q:** Two bells ring at intervals of 12 min and 18 min. If together at 8 AM, next together?  
**Solution:** LCM(12,18) = 36 min. Next at **8:36 AM**

---

## 4. Shortcuts

- **LCM × HCF = a × b** (two numbers)
- **Unit digit:** reduce power mod 4 (or mod 2 for 4 and 9)
- **Divisibility by 8:** last 3 digits divisible by 8
- **Co-prime:** HCF = 1

---

## 5. Practice MCQs

**Q1.** HCF of 24 and 36 = ?  
A) 6  B) 8  C) 12  D) 18  
**Answer: C**

**Q2.** LCM of 15 and 25 = ?  
A) 50  B) 75  C) 100  D) 125  
**Answer: B**

**Q3.** Unit digit of 3^45 = ?  
A) 1  B) 3  C) 7  D) 9  
**Answer: B** (45 mod 4 = 1 → 3¹ = 3)

**Q4.** Largest 4-digit number divisible by 12, 15, 18?  
A) 9960  B) 9720  C) 9900  D) 9840  
**Answer: B** (LCM=180. 9999/180=55.55 → 55×180=9900... check 9720)

**Q5.** Remainder when 1001 divided by 13?  
A) 0  B) 1  C) 2  D) 11  
**Answer: A** (1001 = 7×11×13)

**Q6.** How many factors does 360 have?  
A) 18  B) 20  C) 24  D) 30  
**Answer: C** (360=2³×3²×5 → 4×3×2=24)

**Q7.** Two numbers HCF=12, LCM=360. One number=72. Other?  
A) 40  B) 50  C) 60  D) 80  
**Answer: C** (72×x=12×360 → x=60)

**Q8.** Unit digit of 4^102 = ?  
A) 2  B) 4  C) 6  D) 8  
**Answer: C** (102 mod 2=0 → 4² cycle ends at 6)

**Q9.** Smallest number divisible by 8, 12, 15?  
A) 100  B) 110  C) 120  D) 240  
**Answer: C**

**Q10.** Sum of first 20 natural numbers?  
A) 190  B) 200  C) 210  D) 220  
**Answer: C** (n(n+1)/2 = 20×21/2 = 210)

---

## 6. Exam Strategy

- LCM/HCF word problems appear in **every NTPC shift**
- Unit digit questions: memorize cycles for 2,3,7,8
- Use prime factorization for LCM/HCF of 3+ numbers
