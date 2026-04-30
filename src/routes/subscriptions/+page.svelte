<script>
    import { enhance } from '$app/forms';

    let { form } = $props();

    // Plans config
    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            monthlyPrice: 29,
            yearlyPrice: 290,
            color: 'secondary',
            features: [
                'Full gym access',
                'Locker room access',
                'Free fitness assessment',
                '1 Guest pass/month'
            ],
            pt: false
        },
        {
            id: 'pro',
            name: 'Pro',
            monthlyPrice: 49,
            yearlyPrice: 490,
            color: 'primary',
            features: [
                'Everything in Basic',
                '2 PT sessions/month',
                'Group fitness classes',
                'Nutrition consultation',
                '3 Guest passes/month'
            ],
            pt: true
        },
        {
            id: 'premium',
            name: 'Premium',
            monthlyPrice: 79,
            yearlyPrice: 790,
            color: 'warning',
            features: [
                'Everything in Pro',
                'Unlimited PT sessions',
                'Priority booking',
                'Spa & sauna access',
                'Unlimited guest passes',
                'Dedicated PT trainer'
            ],
            pt: true
        }
    ];

    let billing = $state('monthly');
    let selectedPlan = $state('pro');
    let step = $state(1);

    const selectedPlanData = $derived(plans.find(p => p.id === selectedPlan));

    const price = $derived(
        billing === 'monthly'
            ? selectedPlanData?.monthlyPrice
            : selectedPlanData?.yearlyPrice
    );

    const saving = $derived(
        billing === 'yearly'
            ? selectedPlanData?.monthlyPrice * 12 - selectedPlanData?.yearlyPrice
            : 0
    );

    // Card number formatting
    let cardNumber = $state('');
    function formatCard(e) {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        cardNumber = val.replace(/(.{4})/g, '$1 ').trim();
    }
</script>

<div class="container py-5">

    <!-- Header -->
    <div class="text-center mb-5">
        <h1 class="fw-bold display-5">
            <i class="bi bi-lightning-charge-fill text-warning me-2"></i>
            Join the Gym
        </h1>
        <p class="text-muted lead">Choose your plan and start your fitness journey today</p>

        <!-- Step indicator -->
        <div class="d-flex justify-content-center align-items-center gap-2 mt-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style="width:36px;height:36px;background:{step >= 1 ? '#0d6efd' : '#dee2e6'};color:{step >= 1 ? '#fff' : '#6c757d'}">
                1
            </div>
            <div style="width:60px;height:2px;background:{step >= 2 ? '#0d6efd' : '#dee2e6'}"></div>
            <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style="width:36px;height:36px;background:{step >= 2 ? '#0d6efd' : '#dee2e6'};color:{step >= 2 ? '#fff' : '#6c757d'}">
                2
            </div>
            <div style="width:60px;height:2px;background:{step >= 3 ? '#0d6efd' : '#dee2e6'}"></div>
            <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style="width:36px;height:36px;background:{step >= 3 ? '#0d6efd' : '#dee2e6'};color:{step >= 3 ? '#fff' : '#6c757d'}">
                3
            </div>
        </div>
        <div class="d-flex justify-content-center gap-5 mt-1">
            <small class="text-muted">Choose Plan</small>
            <small class="text-muted">Personal Details</small>
            <small class="text-muted">Payment</small>
        </div>
    </div>

    <form method="post" action="?/subscribe" use:enhance>
        <input type="hidden" name="plan" value={selectedPlan} />
        <input type="hidden" name="billing" value={billing} />

        <!-- STEP 1: Choose Plan -->
        {#if step === 1}
        <div>
            <!-- Billing toggle -->
            <div class="d-flex justify-content-center mb-4">
                <div class="btn-group" role="group">
                    <button type="button"
                        class="btn {billing === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}"
                        onclick={() => billing = 'monthly'}>
                        Monthly
                    </button>
                    <button type="button"
                        class="btn {billing === 'yearly' ? 'btn-primary' : 'btn-outline-primary'}"
                        onclick={() => billing = 'yearly'}>
                        Yearly
                        <span class="badge bg-success ms-1">Save up to €298</span>
                    </button>
                </div>
            </div>

            <!-- Plan cards -->
            <div class="row g-4 justify-content-center mb-4">
                {#each plans as plan}
                <div class="col-md-4">
                    <div
                        class="card h-100 shadow-sm {selectedPlan === plan.id ? 'border-' + plan.color + ' border-3' : ''}"
                        style="cursor:pointer;transition:transform 0.2s;{selectedPlan === plan.id ? 'transform:scale(1.03)' : ''}"
                        onclick={() => selectedPlan = plan.id}
                        role="button"
                        tabindex="0"
                    >
                        {#if plan.id === 'pro'}
                        <div class="card-header bg-primary text-white text-center fw-bold">
                            ⭐ Most Popular
                        </div>
                        {/if}
                        <div class="card-body text-center p-4">
                            <h4 class="fw-bold text-{plan.color}">{plan.name}</h4>
                            <div class="my-3">
                                <span class="display-5 fw-bold">€{billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}</span>
                                <span class="text-muted">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                            </div>
                            {#if billing === 'yearly'}
                            <div class="badge bg-success mb-3">Save €{plan.monthlyPrice * 12 - plan.yearlyPrice}/yr</div>
                            {/if}
                            <ul class="list-unstyled text-start">
                                {#each plan.features as feature}
                                <li class="mb-2">
                                    <i class="bi bi-check-circle-fill text-success me-2"></i>{feature}
                                </li>
                                {/each}
                            </ul>
                            {#if plan.pt}
                            <div class="badge bg-info text-dark mt-2">
                                <i class="bi bi-person-check me-1"></i>PT Access Included
                            </div>
                            {/if}
                        </div>
                        <div class="card-footer text-center pb-3">
                            <div class="form-check d-flex justify-content-center">
                                <input class="form-check-input me-2" type="radio" name="planSelect"
                                    value={plan.id} checked={selectedPlan === plan.id}
                                    onchange={() => selectedPlan = plan.id} />
                                <label class="form-check-label fw-bold">Select {plan.name}</label>
                            </div>
                        </div>
                    </div>
                </div>
                {/each}
            </div>

            <div class="text-center">
                <form method="POST" action="?/subscribe">
                    <input type="hidden" name="plan" value={selectedPlan}>
                    <button type="button" class="btn btn-primary btn-lg px-5" onclick={() => step = 2}>
                        Continue <i class="bi bi-arrow-right ms-1"></i>
                    </button>
                </form>
            </div>
        </div>
        {/if}

        <!-- STEP 2: Personal Details -->
        {#if step === 2}
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <h4 class="mb-4 fw-bold">
                            <i class="bi bi-person-fill me-2"></i>Personal Details
                        </h4>

                        <div class="mb-3">
                            <label class="form-label">Full Name <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control" placeholder="John Doe" required />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Email <span class="text-danger">*</span></label>
                            <input type="email" name="email" class="form-control" placeholder="john@example.com" required />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Phone Number</label>
                            <input type="tel" name="phone" class="form-control" placeholder="+353 87 123 4567" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" name="dob" class="form-control" />
                        </div>

                        <div class="d-flex justify-content-between mt-4">
                            <button type="button" class="btn btn-outline-secondary" onclick={() => step = 1}>
                                <i class="bi bi-arrow-left me-1"></i> Back
                            </button>
                            
                            
                            <form method="POST" action="?/subscribe">
                                <input type="hidden" name="plan" value={selectedPlan}/>
                                <input type="hidden" name="billing" value={billing}/>
                                <button type="submit" class="btn btn-primary">Continue<i class="bi bi-arrow-right ms-1"></i></button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/if}

        <!-- STEP 3: Payment -->
        {#if step === 3}
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm mb-4">
                    <div class="card-body p-4">
                        <h4 class="mb-4 fw-bold">
                            <i class="bi bi-credit-card-fill me-2"></i>Payment Details
                        </h4>

                        <!-- Order summary -->
                        <div class="alert alert-primary d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{selectedPlanData?.name} Plan</strong>
                                <span class="text-muted ms-2">({billing})</span>
                            </div>
                            <div>
                                <strong>€{price}/{billing === 'monthly' ? 'mo' : 'yr'}</strong>
                                {#if saving > 0}
                                <span class="badge bg-success ms-2">Saving €{saving}</span>
                                {/if}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Name on Card <span class="text-danger">*</span></label>
                            <input type="text" name="cardName" class="form-control" placeholder="John Doe" required />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Card Number <span class="text-danger">*</span></label>
                            <input type="text" name="cardNumber" class="form-control"
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                oninput={formatCard}
                                maxlength="19" required />
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Expiry Date <span class="text-danger">*</span></label>
                                <input type="text" name="expiry" class="form-control" placeholder="MM/YY" maxlength="5" required />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">CVV <span class="text-danger">*</span></label>
                                <input type="text" name="cvv" class="form-control" placeholder="123" maxlength="3" required />
                            </div>
                        </div>

                        {#if form?.message}
                        <div class="alert alert-danger">{form.message}</div>
                        {/if}

                        <div class="d-flex justify-content-between mt-4">
                            <button type="button" class="btn btn-outline-secondary" onclick={() => step = 2}>
                                <i class="bi bi-arrow-left me-1"></i> Back
                            </button>
                            <button type="submit" class="btn btn-success btn-lg">
                                <i class="bi bi-lock-fill me-1"></i> Complete Subscription
                            </button>
                        </div>

                        <p class="text-center text-muted mt-3 small">
                            <i class="bi bi-shield-lock me-1"></i>Your payment is secured with 256-bit SSL encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </form>
</div>
<br><br><br><br>