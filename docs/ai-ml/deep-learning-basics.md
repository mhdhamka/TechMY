---
title: Deep Learning Foundations & PyTorch
description: Tensors, automatic differentiation, backpropagation mechanics, activation functions, loss optimizers, and neural network training loops in PyTorch
---

<div class="se-hero">
  <div class="se-hero-badge">AI & Machine Learning Curriculum</div>
  <h1>Deep Learning Foundations & PyTorch</h1>
  <p class="se-hero-subtitle">Master the mechanics of neural computation. Understand tensors, computational graphs, backpropagation calculus, and build clean, production-grade PyTorch training loops.</p>
</div>

---

## 1. Tensors & Computational Graphs (*Deep Learning with PyTorch, Chapter 3*)

At the heart of modern deep learning is the **Tensor**—a multi-dimensional numerical array optimized for massively parallel SIMD execution on hardware accelerators (NVIDIA GPUs, Apple Silicon MPS, or Google TPUs).

Unlike static graph frameworks of the past, **PyTorch** utilizes **Dynamic Computational Graphs (Define-by-Run)**. The graph is constructed dynamically as operations execute, allowing arbitrary Python control flow (`if` statements, dynamic loop counts) directly within the model architecture.

```
Input X ──> [Linear: W1*X + b1] ──> [Activation: ReLU] ──> [Linear: W2*H + b2] ──> Loss L
                     ▲                                             ▲                  │
                     │                                             │                  │
                     └───────────── (Backprop: dL/dW1) ────────────┴── (dL/dW2) ◄─────┘
```

---

## 2. Automatic Differentiation & Backpropagation

Training a neural network means minimizing an objective **Loss Function** $\mathcal{L}(\theta)$ by adjusting weights $\theta$ via **Gradient Descent**:

$$\theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}$$

Where $\eta$ represents the learning rate, and $\nabla_\theta \mathcal{L}$ is computed using the **Multivariate Chain Rule**:

$$\frac{\partial \mathcal{L}}{\partial w_i} = \frac{\partial \mathcal{L}}{\partial y} \cdot \frac{\partial y}{\partial h} \cdot \frac{\partial h}{\partial w_i}$$

PyTorch's `autograd` engine tracks every forward operation where `requires_grad=True` in a directed acyclic graph (DAG), enabling exact reverse-mode automatic differentiation with a single invocation of `loss.backward()`.

---

## 3. Activation Functions & Loss Landscapes

Linear transformations alone can only represent linear decision boundaries. **Non-linear activation functions** allow networks to approximate arbitrary continuous functions (Universal Approximation Theorem):

| Activation | Mathematical Formula | Pros | Cons | Best Used In |
| :--- | :--- | :--- | :--- | :--- |
| **ReLU** | $f(x) = \max(0, x)$ | Fast computation, mitigates vanishing gradient | "Dying ReLU" for negative values | Standard CNNs, Hidden MLP layers |
| **GeLU** | $f(x) = x \cdot \Phi(x)$ | Smooth probabilistic gating | Slightly higher compute | Modern Transformers (BERT, GPT, LLaMA) |
| **Leaky ReLU** | $f(x) = \max(\alpha x, x)$ | Prevents dead neurons with small negative slope | Additional hyperparameter $\alpha$ | GANs, deep discriminators |
| **Softmax** | $\sigma(z)_i = \frac{e^{z_i}}{\sum e^{z_j}}$ | Converts logits to normalized probability distribution | Exponential can overflow without log-sum-exp trick | Multi-class classification outputs |

---

## 4. Modern Optimizers: SGD to AdamW

| Optimizer | Mechanism | Key Advantage |
| :--- | :--- | :--- |
| **SGD + Momentum** | Updates weights with an exponentially decaying moving average of past gradients | Escapes saddle points and shallow local minima |
| **Adam** | Combines adaptive learning rates per parameter (RMSprop) with momentum | Fast initial convergence on sparse gradients |
| **AdamW** | Decouples weight decay ($L_2$ regularization) from the gradient update step | Significantly better generalization on deep transformers and LLMs |

---

## 5. Complete Idiomatic PyTorch Training Loop

Here is an end-to-end, production-ready PyTorch training and validation template with GPU device auto-detection:

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# 1. Device Hardware Selection
device = torch.device(
    "cuda" if torch.cuda.is_available() 
    else "mps" if torch.backends.mps.is_available() 
    else "cpu"
)
print(f"Executing compute on: {device}")

# 2. Define Model Architecture
class ClassifierMLP(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int, num_classes: int):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.LayerNorm(hidden_dim),
            nn.GELU(),
            nn.Dropout(p=0.1),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.GELU(),
            nn.Linear(hidden_dim // 2, num_classes)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)

# 3. Instantiate Model, Loss & Optimizer
model = ClassifierMLP(input_dim=128, hidden_dim=256, num_classes=5).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)

# 4. Synthesize Dummy Data for Demonstration
X_train = torch.randn(1000, 128)
y_train = torch.randint(0, 5, (1000,))
train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=32, shuffle=True)

# 5. Training Epoch Execution
epochs = 5
for epoch in range(epochs):
    model.train() # Enable dropout and active normalization
    running_loss = 0.0
    correct = 0
    total = 0

    for batch_x, batch_y in train_loader:
        batch_x, batch_y = batch_x.to(device), batch_y.to(device)

        # Zero gradients from previous iteration
        optimizer.zero_grad(set_to_none=True)

        # Forward pass
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)

        # Backward pass (computes gradients)
        loss.backward()

        # Gradient clipping to prevent exploding gradients
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

        # Optimizer step (applies updates)
        optimizer.step()

        running_loss += loss.item() * batch_x.size(0)
        _, predicted = outputs.max(1)
        total += batch_y.size(0)
        correct += predicted.eq(batch_y).sum().item()

    epoch_loss = running_loss / total
    epoch_acc = 100.0 * (correct / total)
    print(f"Epoch [{epoch+1}/{epochs}] Loss: {epoch_loss:.4f} | Accuracy: {epoch_acc:.2f}%")
```

---

## 6. Recommended Next Steps
- Dive into **[LLMs & RAG Architectures](/ai-ml/llm-and-rag)** to understand how multi-head self-attention scales into billion-parameter foundational models.
- Explore **[AI & DevOps Workflows (MLOps)](/ai-ml/ai-devops)** to deploy, serve, and monitor models in production.
