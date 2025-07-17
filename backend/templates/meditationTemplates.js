// Professional meditation templates for each type
// These serve as fallback content when AI generation fails
// Each template is designed for 3-5 minutes base duration and can be extended

const meditationTemplates = {
  en: {
    sleep: [
    {
      name: "Body Scan Sleep",
      intro: "Welcome to this peaceful sleep meditation... Find a comfortable position in your bed, allowing your body to sink into the mattress... Close your eyes gently, and begin to notice your breathing... There's nothing you need to do right now except relax and listen to my voice...",
      
      breathing: "Let's begin with some calming breaths... Breathe in slowly through your nose for a count of five... one... two... three... four... five... Hold your breath gently for five... one... two... three... four... five... And now exhale slowly through your mouth for five... one... two... three... four... five... Let your breathing return to its natural rhythm... feeling more relaxed with each breath......",
      
      bodyRelaxation: "Now we'll do a gentle body scan to release any tension... Start by bringing your attention to your feet... Feel them becoming heavy and warm... Let that heaviness spread up through your ankles... your calves... your knees... Feel your legs sinking deeper into the bed... ... Now notice your hips and lower back... Let them soften and release... Feel your belly rising and falling with each breath... Your chest expanding gently... ... Bring your awareness to your shoulders... Let them drop away from your ears... Feel the weight of your arms... heavy and relaxed... Your hands resting peacefully... ... Notice your neck... Let it lengthen and soften... Your jaw unclenches... Your face relaxes... Even the tiny muscles around your eyes let go......",
      
      visualization: "Imagine yourself in a peaceful place... Perhaps you're lying on a soft cloud... floating gently through a starlit sky... Or maybe you're resting in a beautiful garden... surrounded by the soft scent of lavender... The air is the perfect temperature... You feel completely safe and protected... ... With each breath, you drift deeper into relaxation... Your mind becomes quiet and still... like a calm lake reflecting the moon... Any thoughts that arise simply float away like clouds... There's no need to hold onto anything......",
      
      affirmations: "As you rest here in perfect peace, know that... You are safe... You are warm... You are protected... You are loved... ... Your body knows how to sleep... It's safe to let go now... You deserve this rest... Tomorrow will take care of itself... ... Right now, in this moment, everything is exactly as it should be......",
      
      closing: "Continue to rest in this peaceful state... Your body is heavy and relaxed... Your mind is calm and quiet... With each breath, you sink deeper into restful sleep... ... I'll leave you now to drift off into peaceful dreams... Sleep well... Rest deeply... And wake refreshed when it's time... Sweet dreams......"
    },
    
    {
      name: "Ocean Waves Sleep",
      intro: "Welcome to this soothing ocean sleep meditation... Settle into your bed and make yourself completely comfortable... Close your eyes and imagine you're lying on a beautiful beach at sunset... The sound of gentle waves will guide you to peaceful sleep...",
      
      breathing: "Begin by breathing deeply... Inhale the fresh ocean air... feeling it fill your lungs completely... Exhale slowly... releasing all the tension from your day... ... Listen to the rhythm of the waves... In... and out... In... and out... Let your breathing match this natural rhythm... Each breath taking you deeper into relaxation......",
      
      oceanVisualization: "Picture yourself lying on warm, soft sand... The sun is setting, painting the sky in beautiful colors... You can hear the gentle sound of waves rolling onto the shore... Each wave washes away your worries and stress... ... Feel the warm sand supporting your body... The gentle ocean breeze caressing your skin... You are completely safe and peaceful here... ... With each wave that rolls in, you feel more drowsy... more relaxed... The ocean is singing you to sleep......",
      
      bodyRelaxation: "Now let the waves wash over your body... Starting with your feet... Feel them becoming as heavy as wet sand... The waves flow up your legs... making them completely relaxed and heavy... ... The gentle water flows over your hips and lower back... All tension melts away like sand being smoothed by the tide... Your arms float peacefully... heavy and relaxed... ... Feel the waves washing over your chest... your shoulders... your neck... Your face becomes soft and peaceful... completely relaxed......",
      
      affirmations: "With each wave, you know... You are safe and protected... The ocean holds you gently... You are at perfect peace... ... Your body is ready for deep, restful sleep... The waves carry away all your worries... Tomorrow will bring new possibilities... ... Right now, there is only peace... only rest... only the gentle sound of waves......",
      
      closing: "Continue to rest here on this peaceful beach... The waves continue their gentle rhythm... rocking you to sleep... ... Let the sound of the ocean carry you into beautiful dreams... Sleep deeply... Rest completely... And wake refreshed like the dawn over the ocean... Sweet dreams......"
    },
    
    {
      name: "Progressive Muscle Relaxation Sleep",
      intro: "Welcome to this progressive muscle relaxation for sleep... This practice will help you release physical tension and prepare your body for deep rest... Find a comfortable position and close your eyes... We'll systematically relax every muscle in your body...",
      
      breathing: "Begin with three deep, releasing breaths... Inhale slowly through your nose... Hold for a moment... Then exhale completely through your mouth... letting go of the day... ... Again, breathe in deeply... feel your body expanding... Hold... and release with a long, slow exhale... ... One more time... inhale peace... hold... exhale all tension... Now let your breathing become natural and easy......",
      
      progressiveTension: "We'll now tense and release each muscle group... This helps your body learn the difference between tension and relaxation... First, focus on your feet... Curl your toes tightly... Hold for five seconds... one... two... three... four... five... Now release... Feel the relaxation flood through your feet... ... Next, tense your calf muscles... Squeeze them tight... Hold... one... two... three... four... five... And release... Feel the tension melting away......",
      
      fullBodyRelease: "Now tense your thigh muscles... Squeeze them as tight as you can... Hold for five... four... three... two... one... And completely let go... Feel the relief... ... Clench your fists... Hold them tight... five... four... three... two... one... Release and feel your arms become heavy and relaxed... ... Tense your shoulder muscles... Raise them up to your ears... Hold... And drop them down... Feel the release... ... Scrunch your face muscles... Squeeze your eyes shut... Hold... And completely relax... Let your face become soft and peaceful......",
      
      bodyIntegration: "Now that every muscle in your body has been tensed and released... Feel the deep relaxation throughout your entire body... Your feet are completely relaxed... Your legs are heavy and at ease... Your arms are loose and comfortable... Your face is soft and peaceful... ... Notice how different relaxation feels from tension... This is your body's natural state of rest... Let yourself sink deeper into this peaceful feeling......",
      
      affirmations: "Your body is now completely prepared for sleep... Every muscle is relaxed and at ease... You have released all the tension from your day... ... It's safe to let go completely now... Your body knows how to rest and repair itself... You deserve this peaceful sleep... ... Trust in your body's natural wisdom... Allow yourself to drift into deep, restorative sleep......",
      
      closing: "Rest here in this deeply relaxed state... Your body is heavy and comfortable... Your mind is calm and quiet... ... Let this relaxation carry you into peaceful sleep... Sleep deeply... Rest completely... And wake up feeling refreshed and renewed... Good night......"
    },
    
    {
      name: "Yoga Nidra Sleep",
      intro: "Welcome to this yoga nidra practice for sleep... Yoga nidra is a state of conscious relaxation that guides you to the edge of sleep... Lie down comfortably and close your eyes... Allow yourself to be completely supported by your bed...",
      
      intention: "Begin by setting an intention for your sleep... This might be 'I will sleep deeply and peacefully' or 'I will wake refreshed and energized'... Choose words that feel right for you... Hold this intention in your heart... ... Now let go of this intention... trusting that it will work in your subconscious mind while you sleep......",
      
      bodyAwareness: "Bring your attention to your body lying in bed... Notice the weight of your body on the mattress... Feel the places where your body touches the bed... Your head on the pillow... Your shoulders... Your back... Your legs... ... Simply observe these sensations without trying to change anything... Just notice... and let go... ... Feel yourself becoming heavier with each breath......",
      
      breathAwareness: "Now become aware of your natural breathing... Don't try to change your breath... Simply observe it... Notice the pause between inhale and exhale... The pause between exhale and inhale... ... Feel your breath becoming slower and deeper... Each breath taking you closer to sleep... Your body knows exactly how to breathe for rest......",
      
      senseWithdrawal: "Now imagine your senses withdrawing... Like a turtle pulling its head into its shell... Your eyes become heavy and relaxed... Your ears become quiet and peaceful... Your sense of taste and smell fade away... Your skin becomes less sensitive... ... You're moving inward... away from the external world... toward the peaceful realm of sleep......",
      
      visualization: "Imagine yourself in a place of perfect peace... This might be a cozy room... a peaceful garden... or floating in warm water... You feel completely safe and protected here... ... In this peaceful place, you can let go of all thoughts... all worries... all concerns... There's nothing you need to do... nowhere you need to go... ... You are exactly where you need to be......",
      
      affirmations: "As you rest in this peaceful state... Know that you are safe... You are loved... You are exactly where you need to be... ... Your body is healing and restoring itself... Your mind is becoming calm and quiet... Sleep comes naturally and easily... ... Tomorrow will bring new possibilities... But right now, there is only peace... only rest... only the gentle drift toward sleep......",
      
      closing: "Continue to rest in this state of yoga nidra... Between waking and sleeping... This is the perfect place to be... ... Allow yourself to drift deeper... If you fall asleep, that's perfect... If you stay in this peaceful awareness, that's perfect too... ... Rest now... Sleep now... And wake when it's time... Completely refreshed and renewed..."
    },
    
    {
      name: "Bedroom Sanctuary Sleep",
      intro: "Welcome to this bedroom sanctuary meditation... Your bedroom is your sacred space for rest and renewal... Tonight, we'll create a sense of safety and peace in your sleeping environment... Close your eyes and feel the comfort of your bed...",
      
      environmentalAwareness: "First, become aware of your bedroom... Notice the temperature... Is it cool and comfortable for sleep?... Feel the softness of your sheets... The support of your mattress... The comfort of your pillow... ... This is your sanctuary... Your safe haven... A place where you can completely let go... ... Feel gratitude for this space that shelters and protects you......",
      
      breathingAndGrounding: "Take three deep breaths... breathing in the peace of your bedroom... exhaling any stress from the day... ... With each breath, feel yourself sinking deeper into your bed... Your body becoming heavier... more relaxed... ... Feel your connection to this safe space... You are held... You are protected... You are home......",
      
      energyClearing: "Now imagine a gentle light filling your bedroom... This light clears away any negative energy from the day... Any stress... any worry... any tension... ... Watch this light gently dissolve anything that doesn't serve your peaceful sleep... Your bedroom becomes filled with calm, healing energy... ... This space is now perfectly prepared for your rest......",
      
      bodyBlessings: "Place your hands on your heart... Feel your heartbeat... This faithful heart that has carried you through the day... Thank your heart for its constant work... ... Move your hands to your belly... Thank your body for digesting your food... for breathing... for all its automatic functions... ... Your body is wise... It knows how to rest and repair itself while you sleep......",
      
      protection: "Imagine a protective bubble of light surrounding your bed... This bubble keeps you safe while you sleep... Nothing can harm you here... You are completely protected... ... Any worries or fears from the day cannot enter this sacred space... Only peace... only love... only healing energy can reach you here... ... You are safe to completely let go......",
      
      affirmations: "As you rest in your bedroom sanctuary... Know that you are exactly where you need to be... This bed holds you with love... This room protects you with care... ... Your sleep will be deep and peaceful... Your dreams will be gentle and healing... You will wake refreshed and renewed... ... You are blessed... You are loved... You are safe......",
      
      closing: "Continue to rest in your bedroom sanctuary... Feel the love and protection that surrounds you... Your body is relaxed... Your mind is peaceful... ... Let this sacred space hold you as you drift into sleep... Sleep peacefully... Rest deeply... And wake with gratitude for this gift of rest... Sweet dreams......"
    }
  ],

  stress: [
    {
      name: "Mindfulness Stress Relief",
      intro: "Welcome to this stress relief meditation... Find a comfortable seated position, with your back straight but not rigid... Place your feet flat on the floor, feeling the ground beneath you... Rest your hands gently on your lap... And when you're ready, close your eyes or soften your gaze downward...",
      
      breathing: "Let's begin by taking a few deep, cleansing breaths... Breathe in through your nose, filling your lungs completely... And exhale through your mouth, releasing any tension... ... Again, breathe in deeply... feeling your chest and belly expand... And breathe out... letting go of stress and worry... One more time... breathe in fresh, calming energy... And breathe out all that no longer serves you......",
      
      bodyAwareness: "Now bring your attention to your body... Notice any areas where you're holding tension... Perhaps in your shoulders... your jaw... your belly... ... Without trying to change anything, simply notice these sensations... Acknowledge them with kindness... ... Now imagine breathing into these tense areas... With each inhale, send breath and space to the tension... With each exhale, feel the tightness beginning to soften... ... Continue this gentle breathing... in... creating space... out... releasing tension......",
      
      mindfulness: "Let your attention rest on the present moment... Notice the feeling of your breath moving in and out... The gentle rise and fall of your chest... ... When thoughts about your day arise... and they will... simply notice them without judgment... Like clouds passing through the sky... Let them drift by... ... Return your attention to your breath... This is your anchor... Always available... Always present... ... There's nothing you need to figure out right now... No problems to solve... Just this breath... then the next......",
      
      visualization: "Imagine a warm, golden light above your head... This is the light of peace and calm... With each breath, this light flows down through your body... ... It flows through your head... releasing mental tension... Down through your neck and shoulders... melting away stress... Through your chest... calming your heart... Down your arms to your fingertips... ... The golden light continues through your belly... soothing any anxiety... Down through your hips and legs... grounding you... All the way to your toes... ... You are now filled with this peaceful, golden light......",
      
      closing: "As we prepare to end this meditation... Know that this sense of calm is always available to you... Just a few breaths away... ... Begin to wiggle your fingers and toes... Roll your shoulders gently... And when you're ready, slowly open your eyes... ... Take a moment to notice how you feel... Carry this peace with you as you continue your day... Remember, you can return to this calm center whenever you need... Thank you for taking this time for yourself......"
    },
    
    {
      name: "Body Scan Stress Release",
      intro: "Welcome to this body scan meditation for stress release... This practice helps you systematically release tension held throughout your body... Find a comfortable position... Close your eyes and prepare to journey through your body with awareness and compassion...",
      
      breathing: "Start by taking three deep, releasing breaths... Breathe in through your nose... filling your body with calming energy... Exhale through your mouth... releasing the stress of the day... ... Feel your body beginning to relax... Your breath becoming deeper and more natural... Each exhale carries away tension... Each inhale brings peace......",
      
      headAndNeck: "Begin by bringing your attention to the top of your head... Notice any tension or tightness... Breathe into this area... Send relaxation to your scalp... ... Move your attention to your forehead... Often we hold stress here... Let your forehead become smooth and relaxed... ... Notice your eyes... Let them soften... Your jaw... Let it unlock and relax... Feel your whole face becoming peaceful......",
      
      shouldersAndArms: "Now focus on your neck... This area often holds the weight of our stress... Breathe into your neck... Let it lengthen and soften... ... Bring your attention to your shoulders... Notice if they're raised toward your ears... Let them drop down... Feel the relief as they release... ... Your arms... Let them become heavy and relaxed... Your hands... Let them rest peacefully... All tension flowing away through your fingertips......",
      
      torsoAndCore: "Focus on your chest... Sometimes stress makes our chest feel tight... Breathe into your chest... Let it expand and relax... ... Your heart... Send it love and appreciation... It's been working hard... Let it rest in peace... ... Your belly... This is where we often hold emotional tension... Breathe into your belly... Let it soften and release... ... Your back... Let it be supported... All the burdens you carry... let them go......",
      
      lowerBodyRelease: "Bring your attention to your hips... Let them settle and relax... ... Your legs... Let them become heavy and loose... Feel the stress draining down through your legs... ... Your feet... Let them completely relax... Feel all the tension leaving your body through your feet... flowing into the earth... ... Your whole body is now relaxed and at peace......",
      
      integration: "Take a moment to feel your entire body... Relaxed... peaceful... free from tension... ... Notice how different you feel when stress is released... This is your body's natural state... Remember this feeling... You can return to it whenever you need... ... Breathe in this peace... Breathe out any remaining tension......",
      
      closing: "As we complete this body scan... Know that you have the power to release stress at any time... Simply breathe into tension and let it go... ... Slowly begin to move your fingers and toes... When you're ready, open your eyes... Carry this relaxation with you into your day... You are calm... You are at peace... You are in control of your stress response..."
    },
    
    {
      name: "Breathing for Stress Relief",
      intro: "Welcome to this breathing meditation for stress relief... When we're stressed, our breathing becomes shallow and rapid... This practice will help you use your breath to activate your body's natural relaxation response... Find a comfortable position and close your eyes...",
      
      breathAwareness: "Begin by simply noticing your breath... Don't try to change it... Just observe... Notice where you feel your breath most clearly... Perhaps at your nostrils... or in your chest... or your belly... ... Simply watch your breath for a few moments... This is your life force... Always available... Always supporting you......",
      
      deepBreathing: "Now we'll deepen your breathing... Place one hand on your chest and one on your belly... As you breathe in, feel your belly expand... This is deep, diaphragmatic breathing... ... Breathe in slowly through your nose... feeling your belly rise... Breathe out through your mouth... feeling your belly fall... ... Continue this deep breathing... In through the nose... Out through the mouth... Each breath releasing stress......",
      
      countedBreathing: "Now let's add counting to regulate your breath... Breathe in for a count of four... one... two... three... four... Hold for four... one... two... three... four... Breathe out for six... one... two... three... four... five... six... ... The longer exhale helps activate your relaxation response... Continue this pattern... In for four... Hold for four... Out for six... ... Feel your nervous system calming with each breath......",
      
      breathVisualization: "As you continue this breathing pattern... Imagine breathing in calm, cool air... This air carries peace and tranquility... ... As you breathe out, imagine releasing hot, tense air... This air carries away your stress and worry... ... In... cool, calming air... Out... hot, stressful air... ... With each cycle, you become more relaxed... more at peace......",
      
      affirmations: "As you breathe, repeat these affirmations silently... 'I am calm'... Breathe in... 'I am at peace'... Breathe out... ... 'I release all stress'... Breathe in... 'I am in control'... Breathe out... ... 'I am safe'... Breathe in... 'I am relaxed'... Breathe out... ... Continue with any affirmations that feel right for you......",
      
      integration: "Now let your breathing return to normal... But notice how different it feels... Deeper... more relaxed... more natural... ... Remember, your breath is always with you... Whenever you feel stressed, you can return to this calm breathing... ... Take a moment to appreciate this tool you always carry with you......",
      
      closing: "As we end this breathing meditation... Know that you have accessed your body's natural stress relief system... Your breath is your constant companion... always ready to help you find calm... ... Take three more deep breaths... Wiggle your fingers and toes... When you're ready, open your eyes... You are calm... You are centered... You are at peace..."
    },
    
    {
      name: "Grounding for Stress Relief",
      intro: "Welcome to this grounding meditation for stress relief... When we're stressed, we often feel scattered and overwhelmed... This practice will help you feel centered, stable, and connected to the present moment... Find a comfortable seated position with your feet on the floor...",
      
      physicalGrounding: "Begin by feeling your connection to the earth... Feel your feet flat on the floor... Press them gently into the ground... ... Feel your sitting bones in contact with your chair... Your back against the chair... ... Notice the temperature of the air on your skin... The texture of your clothing... ... These physical sensations anchor you in the present moment... You are here... You are safe... You are grounded......",
      
      breathingAndEarth: "Now imagine roots growing from your feet... Deep into the earth... These roots connect you to the stable, supportive energy of the earth... ... With each breath, feel these roots growing deeper... anchoring you... supporting you... ... The earth is always here for you... Solid... reliable... unchanging... ... Feel this stability rising up through your roots... into your body... grounding you......",
      
      fiveToGrounding: "Let's use the 5-4-3-2-1 technique to ground yourself... Notice five things you can hear... Perhaps the sound of your breath... sounds outside... the hum of electricity... ... Notice four things you can touch... Your feet on the floor... your hands in your lap... the chair supporting you... your clothing... ... Notice three things you can smell... The air in the room... perhaps a faint scent of cleaning products... or outside air... ... Notice two things you can taste... Perhaps the lingering taste of something you drank... or just the taste of your mouth... ... Notice one thing you can see with your eyes closed... Perhaps patterns of light... or just darkness... ... You are fully present... fully grounded......",
      
      mountainVisualization: "Imagine yourself as a mountain... Strong... solid... unmovable... ... Your base is deep and wide... rooted firmly in the earth... Nothing can shake you... ... Storms may come and go around you... But you remain steady... stable... grounded... ... Feel this mountain strength in your own body... You are solid... You are stable... You are grounded......",
      
      stressRelease: "Now imagine all your stress... all your worries... all your tensions... flowing down through your body... Down through your roots... into the earth... ... The earth is infinitely capable of absorbing and transforming this stress... ... With each breath, send more stress down through your roots... Let the earth take it... transform it... ... You are becoming lighter... clearer... more at peace......",
      
      affirmations: "Repeat these grounding affirmations... 'I am connected to the earth'... 'I am stable and strong'... 'I am present in this moment'... ... 'I am safe and secure'... 'I am grounded and centered'... 'I am at peace'... ... Feel these truths in your body... in your bones... in your connection to the earth......",
      
      closing: "As we end this grounding meditation... Feel how different you are now... More stable... more centered... more at peace... ... Remember, you can connect to this grounding energy anytime... Simply feel your feet on the floor... your connection to the earth... ... Take three deep breaths... Wiggle your fingers and toes... When you're ready, open your eyes... You are grounded... You are centered... You are at peace..."
    },
    
    {
      name: "Stress Release Visualization",
      intro: "Welcome to this stress release visualization... Sometimes we need to actively release stress that feels stuck in our bodies and minds... This practice will help you visualize releasing stress and replacing it with peace... Find a comfortable position and close your eyes...",
      
      stressAwareness: "Begin by acknowledging the stress you're carrying... Without judgment... simply notice where you feel it in your body... Perhaps tension in your shoulders... tightness in your chest... a knot in your stomach... ... It's okay to feel this stress... It's your body's way of responding to challenges... But now it's time to let it go......",
      
      breathingPrep: "Take three deep breaths... With each exhale, give yourself permission to release... ... Breathe in... accepting where you are right now... Breathe out... beginning to let go... ... Breathe in... gathering your strength... Breathe out... preparing to release... ... Breathe in... connecting to your inner peace... Breathe out... ready to transform......",
      
      colorVisualization: "Now imagine your stress as a color... What color comes to mind?... Perhaps dark gray... or heavy black... or hot red... ... See this color in the areas of your body where you feel stress... Notice how it looks... how it feels... ... Now imagine a healing light approaching... This might be golden... or bright white... or soft blue... whatever feels healing to you... ... This healing light is going to transform your stress......",
      
      transformation: "Watch as the healing light begins to touch the areas of stress... See how it begins to dissolve the dark, heavy color... ... With each breath, the healing light grows stronger... penetrating deeper... transforming the stress... ... Breathe in the healing light... Breathe out the stress color... ... In... healing and peace... Out... stress and tension... ... Continue this process... watching the transformation happen......",
      
      lightFilling: "As the stress color is completely dissolved... watch as the healing light fills every cell of your body... ... Your head is filled with this peaceful light... Your neck and shoulders... Your arms and hands... Your chest and heart... ... Your belly... Your back... Your hips... Your legs... Your feet... ... Your entire body is now filled with healing, peaceful light... You are transformed......",
      
      energyShield: "Now imagine this healing light extending beyond your body... Creating a protective bubble around you... This bubble protects you from taking on new stress... ... You can see stress trying to reach you... but it bounces off your protective light... You remain peaceful and protected... ... This shield goes with you... protecting your peace throughout your day......",
      
      affirmations: "From this place of peace and protection, affirm... 'I am free from stress'... 'I am filled with peace'... 'I am protected and safe'... ... 'I choose calm over chaos'... 'I am in control of my response'... 'I am at peace'... ... Feel these affirmations becoming true in your body... in your mind... in your life......",
      
      closing: "As we complete this visualization... Know that you have the power to transform stress into peace... This healing light is always available to you... ... Take three deep breaths... Feeling peaceful... protected... transformed... ... Wiggle your fingers and toes... When you're ready, open your eyes... You are free... You are at peace... You are protected..."
    }
  ],

  focus: [
    {
      name: "Breath Anchor Focus",
      intro: "Welcome to this focus and concentration meditation... Sit comfortably with your spine tall and alert... Rest your hands on your knees or in your lap... Take a moment to set an intention for clarity and focus... When you're ready, gently close your eyes...",
      
      breathing: "Begin by taking three deep, energizing breaths... Breathe in through your nose, filling your lungs with fresh air... And exhale completely through your mouth... ... Again, inhale deeply... feeling alert and awake... Exhale fully... releasing any mental fog... One more time... breathe in clarity... breathe out distraction... ... Now let your breathing return to normal... but keep your attention on each breath......",
      
      anchorPractice: "We'll use your breath as an anchor for your attention... Focus on the sensation of air entering your nostrils... Cool on the inhale... Warm on the exhale... ... Keep your attention right at the tip of your nose... Where you first feel the breath... ... When your mind wanders—and it will—simply notice where it went... Then gently, without judgment, bring your attention back to the breath... This is the practice... Notice... Return... Again and again......",
      
      countingMeditation: "To sharpen your focus further, let's add counting... On your next inhale, mentally count 'one'... On the exhale, count 'two'... Inhale, 'three'... Exhale, 'four'... ... Continue counting up to ten... Then start again at one... ... If you lose count, no problem... Simply begin again at one... This trains your mind to stay present and focused... ... One... two... three... four... maintaining steady attention......",
      
      visualization: "Now imagine a bright point of light at the center of your forehead... This is your focus point... See it clearly in your mind's eye... ... This light represents your concentrated attention... Notice how it becomes brighter and more stable as you focus... ... Any distracting thoughts are like shadows... They can't affect this bright, steady light... Your focus remains clear and strong... ... Feel your mind becoming sharper... more alert... ready for whatever task awaits......",
      
      affirmations: "Mentally repeat these affirmations for focus... 'My mind is clear and sharp'... ... 'I am fully present and aware'... ... 'My concentration is strong and steady'... ... 'I focus with ease and clarity'... ... Let these words sink deep into your consciousness......",
      
      closing: "As we complete this meditation... Feel the enhanced clarity in your mind... Your improved ability to focus... ... Begin to deepen your breathing... Wiggle your fingers and toes... And when you're ready, open your eyes... ... Notice how alert and focused you feel... Your mind is clear, sharp, and ready... Carry this focused attention into your next activity... You are prepared to work with precision and clarity......"
    }
  ],

  anxiety: [
    {
      name: "Grounding Anxiety Relief",
      intro: "Welcome to this anxiety relief meditation... Find a comfortable position where you feel supported and safe... You might want to place one hand on your heart and one on your belly... This helps you feel grounded and connected to yourself... Take a moment to arrive here fully...",
      
      grounding: "Let's begin by grounding ourselves in the present moment... Feel your feet on the floor... or your body in the chair... Notice five things you can feel right now... The temperature of the air... The texture of your clothing... The weight of your body... ... This is real... This is now... You are safe in this moment......",
      
      breathing: "Now let's use a calming breath pattern... Breathe in slowly for four counts... one... two... three... four... Hold gently for four... one... two... three... four... And exhale slowly for six... one... two... three... four... five... six... ... This longer exhale activates your body's relaxation response... Again... in for four... hold for four... out for six... ... Continue this soothing rhythm... feeling calmer with each cycle......",
      
      bodyRelease: "Scan your body for any areas of tension or anxiety... You might notice tightness in your chest... butterflies in your stomach... tension in your shoulders... ... That's okay... This is your body trying to protect you... Thank it for caring about your safety... ... Now imagine breathing into these areas... Send them compassion and warmth... With each exhale, let the anxiety soften just a little... You don't have to force anything... Just allow......",
      
      visualization: "Imagine yourself in a place where you feel completely safe and calm... This might be a cozy room... a peaceful beach... a quiet forest... wherever feels right for you... ... Notice all the details of this safe place... The colors... the sounds... the smells... the textures... ... Feel yourself relaxing more deeply in this sanctuary... Here, nothing can harm you... You are protected and at peace... ... If anxious thoughts arise, imagine them as leaves floating by on a gentle stream... You can observe them without being swept away......",
      
      affirmations: "Let's offer ourselves some calming affirmations... 'I am safe in this moment'... ... 'This feeling will pass'... ... 'I have survived anxiety before, and I will survive it again'... ... 'I am stronger than my anxiety'... ... 'Peace is my natural state'... ... 'I choose calm'......",
      
      closing: "As we end this meditation... Remember that you always have these tools available... Your breath... Your safe place... Your inner strength... ... Begin to gently move your body... Maybe stretch a little... Take a deep breath and slowly open your eyes... ... Notice any shift in how you feel... Even a small change is significant... Be gentle with yourself as you return to your day... You are brave... You are capable... And you are not alone......"
    }
  ],

  energy: [
    {
      name: "Golden Sun Energy",
      intro: "Welcome to this energizing meditation... Sit or stand in a position that feels strong and alert... Imagine a string pulling you up from the crown of your head... Feel your spine lengthen... your chest open... You're about to awaken your natural vitality...",
      
      breathing: "Let's begin with some energizing breaths... Take a deep breath in through your nose... filling your entire body with fresh energy... And exhale forcefully through your mouth with a 'HA' sound... releasing any fatigue... ... Again, breathe in vitality and life force... And exhale 'HA'... letting go of sluggishness... One more time... inhale power and energy... Exhale 'HA'... feeling more awake......",
      
      bodyAwakening: "Now let's awaken your body's energy... Start by rubbing your palms together vigorously... Feel the heat and energy building... Place your warm palms over your eyes for a moment... ... Now tap gently all over your scalp with your fingertips... Awakening your mind... Massage your temples in small circles... ... Roll your shoulders back... feeling your chest open and expand... Gently twist your spine left and right... Feeling energy flow through your core......",
      
      energyVisualization: "Imagine a bright golden sun at the center of your chest... This is your inner source of energy... With each breath, this sun grows brighter and larger... ... Feel its warm rays spreading through your entire body... Up through your chest and shoulders... Down your arms to your fingertips... which tingle with energy... ... The golden light flows up through your throat and head... Your mind becomes clear and alert... Down through your belly and hips... Through your legs... grounding you while energizing you... ... Your whole body glows with vibrant life force......",
      
      affirmations: "Let's activate your energy with powerful affirmations... 'I am filled with vibrant energy'... ... 'My body is strong and alive'... ... 'I have all the energy I need for my day'... ... 'I am motivated and ready for action'... ... 'Energy flows freely through me'... ... Feel these words charging every cell of your body......",
      
      activation: "Now let's seal in this energy... Take three deep breaths, making each one bigger than the last... First breath... feeling energy building... Second breath... energy expanding... Third breath... hold it at the top... feel the energy pulsing through you... And release with a smile... ... Feel your eyes bright and alert... Your mind sharp and focused... Your body energized and ready......",
      
      closing: "As we complete this energizing meditation... Feel the vitality coursing through your veins... You are awake... alert... and fully charged... ... Begin to move your body however feels good... Maybe stretch your arms overhead... Roll your neck... Bounce gently on your toes... ... When you're ready, open your eyes wide... Take in the world with fresh energy... You are ready to embrace your day with enthusiasm and power... Go forth and shine your light......"
    }
  ]
  },

  // Nederlandse meditatie templates
  nl: {
    sleep: [
      {
        name: "Lichaamsscan Slaap",
        intro: "Welkom bij deze vredige slaapmeditatie... Zoek een comfortabele positie in je bed... laat je lichaam wegzakken in het matras... Sluit je ogen zachtjes en begin je ademhaling op te merken... Er is nu niets dat je hoeft te doen... behalve ontspannen en naar mijn stem luisteren...",
        
        breathing: "Laten we beginnen met wat kalmerende ademhalingen... Adem langzaam in door je neus... tel tot vijf... één... twee... drie... vier... vijf... Houd je adem zachtjes vast... één... twee... drie... vier... vijf... En nu langzaam uitademen door je mond... één... twee... drie... vier... vijf... Laat je ademhaling terugkeren naar het natuurlijke ritme... je voelt je meer ontspannen bij elke ademhaling......",
        
        bodyRelaxation: "Nu gaan we een zachte lichaamsscan doen om alle spanning los te laten... Begin met je aandacht naar je voeten... Voel hoe ze zwaar en warm worden... Laat die zwaarte omhoog stromen door je enkels... je kuiten... je knieën... Voel je benen dieper wegzakken in het bed... ... Breng nu je aandacht naar je heupen en onderrug... Laat ze zacht worden en loslaten... Voel je buik op en neer gaan met elke ademhaling... Je borst die zachtjes uitzet... ... Breng je bewustzijn naar je schouders... Laat ze wegvallen van je oren... Voel het gewicht van je armen... zwaar en ontspannen... Je handen rusten vredig... ... Merk je nek op... Laat deze langer worden en zachter... Je kaak ontspant... Je gezicht wordt rustig... Zelfs de kleine spiertjes rond je ogen laten los......",
        
        visualization: "Stel je voor dat je op een vredige plek bent... Misschien lig je op een zachte wolk... zachtjes drijvend door een sterrenhemel... Of misschien rust je in een prachtige tuin... omringd door de zachte geur van lavendel... De lucht heeft de perfecte temperatuur... Je voelt je volledig veilig en beschermd... ... Met elke ademhaling drijf je dieper weg in ontspanning... Je geest wordt stil en rustig... als een kalm meer dat de maan weerkaatst... Gedachten die opkomen drijven gewoon weg als wolken... Je hoeft nergens aan vast te houden......",
        
        affirmations: "Terwijl je hier rust in perfecte vrede... weet dat... Je bent veilig... Je bent warm... Je bent beschermd... Je bent geliefd... ... Je lichaam weet hoe het moet slapen... Het is veilig om nu los te laten... Je verdient deze rust... Morgen zorgt wel voor zichzelf... ... Op dit moment... in dit nu... is alles precies zoals het hoort te zijn......",
        
        closing: "Blijf rusten in deze vredige toestand... Je lichaam is zwaar en ontspannen... Je geest is kalm en stil... Met elke ademhaling zak je dieper weg in rustgevende slaap... ... Ik laat je nu alleen om weg te drijven in vredige dromen... Slaap lekker... Rust diep... En word verfrist wakker wanneer het tijd is... Welterusten......"
      },
      
      {
        name: "Oceaangolven Slaap",
        intro: "Welkom bij deze rustgevende oceaan slaapmeditatie... Nestel je comfortabel in je bed... Sluit je ogen en stel je voor dat je ligt op een prachtig strand bij zonsondergang... Het geluid van zachte golven zal je naar een vredige slaap leiden...",
        
        breathing: "Begin met diep ademhalen... Inademen van de frisse zeelucht... voel hoe deze je longen volledig vult... Langzaam uitademen... laat alle spanning van de dag los... ... Luister naar het ritme van de golven... In... en uit... In... en uit... Laat je ademhaling dit natuurlijke ritme volgen... Elke ademhaling brengt je dieper in ontspanning......",
        
        oceanVisualization: "Stel je voor dat je ligt op warm... zacht zand... De zon gaat onder en schildert de lucht in prachtige kleuren... Je hoort het zachte geluid van golven die op de kust rollen... Elke golf spoelt je zorgen en stress weg... ... Voel het warme zand dat je lichaam ondersteunt... De zachte zeebries die je huid streelt... Je bent hier volledig veilig en vredig... ... Met elke golf die binnenkomt... voel je je slaperig... meer ontspannen... De oceaan zingt je in slaap......",
        
        bodyRelaxation: "Laat nu de golven over je lichaam spoelen... Begin met je voeten... Voel hoe ze zo zwaar worden als nat zand... De golven stromen omhoog door je benen... maken ze volledig ontspannen en zwaar... ... Het zachte water stroomt over je heupen en onderrug... Alle spanning smelt weg zoals zand dat glad wordt gemaakt door het getij... Je armen drijven vredig... zwaar en ontspannen... ... Voel de golven over je borst spoelen... je schouders... je nek... Je gezicht wordt zacht en vredig... volledig ontspannen......",
        
        affirmations: "Met elke golf weet je... Je bent veilig en beschermd... De oceaan houdt je zachtjes vast... Je bent in perfecte vrede... ... Je lichaam is klaar voor diepe... rustgevende slaap... De golven dragen al je zorgen weg... Morgen brengt nieuwe mogelijkheden... ... Op dit moment is er alleen vrede... alleen rust... alleen het zachte geluid van golven......",
        
        closing: "Blijf hier rusten op dit vredige strand... De golven zetten hun zachte ritme voort... wiegen je in slaap... ... Laat het geluid van de oceaan je meenemen naar prachtige dromen... Slaap diep... Rust volledig... En word verfrist wakker als de dageraad over de oceaan... Welterusten......"
      }
    ],

    stress: [
      {
        name: "Mindfulness Stressverlichting",
        intro: "Welkom bij deze stressverlichting meditatie... Ga comfortabel zitten... je rug recht maar niet stijf... Plaats je voeten plat op de grond... voel de vloer onder je... Leg je handen zachtjes op je schoot... En wanneer je er klaar voor bent... sluit je ogen of laat je blik zachtjes naar beneden gaan...",
        
        breathing: "Laten we beginnen met een paar diepe... zuiverende ademhalingen... Adem in door je neus... vul je longen volledig... En adem uit door je mond... laat alle spanning los... ... Nogmaals... adem diep in... voel je borst en buik uitzetten... En adem uit... laat stress en zorgen los... Nog een keer... adem frisse... kalmerende energie in... En adem alles uit wat je niet meer dient......",
        
        bodyAwareness: "Breng nu je aandacht naar je lichaam... Merk plaatsen op waar je spanning vasthoudt... Misschien in je schouders... je kaak... je buik... ... Probeer niets te veranderen... merk deze gevoelens gewoon op... Erken ze met vriendelijkheid... ... Stel je nu voor dat je inademt in deze gespannen gebieden... Met elke inademing stuur je adem en ruimte naar de spanning... Met elke uitademing voel je de strakheid zachter worden... ... Ga door met deze zachte ademhaling... in... creëer ruimte... uit... laat spanning los......",
        
        mindfulness: "Laat je aandacht rusten in het huidige moment... Merk het gevoel van je adem die in en uit gaat... Het zachte op en neer van je borst... ... Wanneer gedachten over je dag opkomen... en dat zullen ze doen... merk ze gewoon op zonder oordeel... Zoals wolken die door de lucht trekken... Laat ze voorbij drijven... ... Keer terug naar je adem... Dit is je anker... Altijd beschikbaar... Altijd aanwezig... ... Er is nu niets dat je hoeft uit te zoeken... Geen problemen om op te lossen... Gewoon deze ademhaling... dan de volgende......",
        
        visualization: "Stel je een warm... gouden licht boven je hoofd voor... Dit is het licht van vrede en rust... Met elke ademhaling stroomt dit licht naar beneden door je lichaam... ... Het stroomt door je hoofd... lost mentale spanning op... Naar beneden door je nek en schouders... smelt stress weg... Door je borst... kalmeert je hart... Naar beneden door je armen tot je vingertoppen... ... Het gouden licht gaat verder door je buik... kalmeert elke angst... Naar beneden door je heupen en benen... aard je... Helemaal tot je tenen... ... Je bent nu gevuld met dit vredige... gouden licht......",
        
        closing: "Terwijl we deze meditatie beëindigen... Weet dat dit gevoel van rust altijd beschikbaar is... Slechts een paar ademhalingen ver weg... ... Begin je vingers en tenen te bewegen... Rol je schouders zachtjes... En wanneer je er klaar voor bent... open langzaam je ogen... ... Neem een moment om te voelen hoe je je voelt... Neem deze vrede mee terwijl je verder gaat met je dag... Onthoud... je kunt altijd terugkeren naar dit rustige centrum wanneer je dat nodig hebt... Dank je dat je deze tijd voor jezelf hebt genomen......"
      }
    ],

    focus: [
      {
        name: "Ademanker Focus",
        intro: "Welkom bij deze focus en concentratie meditatie... Ga comfortabel zitten met je ruggengraat lang en alert... Leg je handen op je knieën of in je schoot... Neem even de tijd om een intentie te stellen voor helderheid en focus... Wanneer je er klaar voor bent... sluit zachtjes je ogen...",
        
        breathing: "Begin met drie diepe... energieke ademhalingen... Adem in door je neus... vul je longen met frisse lucht... En adem volledig uit door je mond... ... Nogmaals... adem diep in... voel je alert en wakker... Adem volledig uit... laat mentale waas los... Nog een keer... adem helderheid in... adem afleiding uit... ... Laat je ademhaling nu terugkeren naar normaal... maar houd je aandacht bij elke ademhaling......",
        
        anchorPractice: "We gaan je adem gebruiken als anker voor je aandacht... Focus op het gevoel van lucht die je neusgaten binnenkomt... Koel bij het inademen... Warm bij het uitademen... ... Houd je aandacht precies bij het puntje van je neus... Waar je de adem het eerst voelt... ... Wanneer je geest afdwaalt... en dat zal gebeuren... merk gewoon op waar hij naartoe ging... Breng dan zachtjes... zonder oordeel... je aandacht terug naar de adem... Dit is de oefening... Opmerken... Terugkeren... Keer op keer......",
        
        countingMeditation: "Om je focus verder aan te scherpen... voegen we tellen toe... Bij je volgende inademing... tel mentaal 'één'... Bij de uitademing... tel 'twee'... Inademen... 'drie'... Uitademen... 'vier'... ... Ga door met tellen tot tien... Begin dan weer bij één... ... Als je de tel kwijtraakt... geen probleem... Begin gewoon weer bij één... Dit traint je geest om aanwezig en gefocust te blijven... ... Één... twee... drie... vier... behoud gestage aandacht......",
        
        visualization: "Stel je nu een helder lichtpunt voor in het centrum van je voorhoofd... Dit is je focuspunt... Zie het duidelijk voor je geestesoog... ... Dit licht vertegenwoordigt je geconcentreerde aandacht... Merk op hoe het helderder en stabieler wordt terwijl je focus... ... Afleidende gedachten zijn zoals schaduwen... Ze kunnen dit heldere... stabiele licht niet beïnvloeden... Je focus blijft helder en sterk... ... Voel je geest scherper worden... alerter... klaar voor welke taak dan ook......",
        
        affirmations: "Herhaal deze affirmaties voor focus mentaal... 'Mijn geest is helder en scherp'... ... 'Ik ben volledig aanwezig en bewust'... ... 'Mijn concentratie is sterk en stabiel'... ... 'Ik focus met gemak en helderheid'... ... Laat deze woorden diep in je bewustzijn zinken......",
        
        closing: "Terwijl we deze meditatie voltooien... Voel de verbeterde helderheid in je geest... Je verbeterde vermogen om te focussen... ... Begin je ademhaling te verdiepen... Beweeg je vingers en tenen... En wanneer je er klaar voor bent... open je ogen... ... Merk op hoe alert en gefocust je je voelt... Je geest is helder... scherp en klaar... Neem deze gerichte aandacht mee naar je volgende activiteit... Je bent voorbereid om met precisie en helderheid te werken......"
      }
    ],

    anxiety: [
      {
        name: "Grounding Angstverlichting",
        intro: "Welkom bij deze angstverlichting meditatie... Zoek een comfortabele positie waar je je ondersteund en veilig voelt... Je kunt één hand op je hart leggen en één op je buik... Dit helpt je gegrond en verbonden met jezelf te voelen... Neem even de tijd om hier volledig aan te komen...",
        
        grounding: "Laten we beginnen met onszelf te gronden in het huidige moment... Voel je voeten op de grond... of je lichaam in de stoel... Merk vijf dingen op die je nu kunt voelen... De temperatuur van de lucht... De textuur van je kleding... Het gewicht van je lichaam... ... Dit is echt... Dit is nu... Je bent veilig in dit moment......",
        
        breathing: "Laten we nu een kalmerend adempatroon gebruiken... Adem langzaam in gedurende vier tellen... één... twee... drie... vier... Houd zachtjes vast gedurende vier... één... twee... drie... vier... En adem langzaam uit gedurende zes... één... twee... drie... vier... vijf... zes... ... Deze langere uitademing activeert je lichaam's ontspanningsreactie... Nogmaals... in gedurende vier... vasthouden gedurende vier... uit gedurende zes... ... Ga door met dit rustgevende ritme... voel je kalmer worden met elke cyclus......",
        
        bodyRelease: "Scan je lichaam op gebieden van spanning of angst... Je merkt misschien strakheid in je borst... vlinders in je maag... spanning in je schouders... ... Dat is oké... Dit is je lichaam dat probeert je te beschermen... Bedank het voor het zorgen voor je veiligheid... ... Stel je nu voor dat je inademt in deze gebieden... Stuur ze medeleven en warmte... Met elke uitademing... laat de angst een beetje zachter worden... Je hoeft niets te forceren... Sta het gewoon toe......",
        
        visualization: "Stel je voor dat je op een plek bent waar je je volledig veilig en kalm voelt... Dit kan een gezellige kamer zijn... een vredig strand... een stil bos... waar het voor jou goed voelt... ... Merk alle details van deze veilige plek op... De kleuren... de geluiden... de geuren... de texturen... ... Voel jezelf dieper ontspannen in dit toevluchtsoord... Hier kan niets je kwaad doen... Je bent beschermd en in vrede... ... Als angstige gedachten opkomen... stel je voor dat het bladeren zijn die voorbij drijven op een zachte stroom... Je kunt ze observeren zonder meegesleept te worden......",
        
        affirmations: "Laten we onszelf wat kalmerende affirmaties geven... 'Ik ben veilig in dit moment'... ... 'Dit gevoel zal voorbijgaan'... ... 'Ik heb angst eerder overleefd... en ik zal het weer overleven'... ... 'Ik ben sterker dan mijn angst'... ... 'Vrede is mijn natuurlijke staat'... ... 'Ik kies voor rust'......",
        
        closing: "Terwijl we deze meditatie beëindigen... Onthoud dat je deze hulpmiddelen altijd beschikbaar hebt... Je adem... Je veilige plek... Je innerlijke kracht... ... Begin je lichaam zachtjes te bewegen... Misschien een beetje rekken... Neem een diepe ademhaling en open langzaam je ogen... ... Merk elke verandering in hoe je je voelt op... Zelfs een kleine verandering is significant... Wees zacht voor jezelf terwijl je terugkeert naar je dag... Je bent moedig... Je bent capabel... En je bent niet alleen......"
      }
    ],

    energy: [
      {
        name: "Gouden Zon Energie",
        intro: "Welkom bij deze energiegevende meditatie... Ga zitten of staan in een positie die sterk en alert voelt... Stel je een touwtje voor dat je omhoog trekt vanaf de kruin van je hoofd... Voel je ruggengraat langer worden... je borst openen... Je staat op het punt je natuurlijke vitaliteit te wekken...",
        
        breathing: "Laten we beginnen met energieke ademhalingen... Neem een diepe ademhaling door je neus... vul je hele lichaam met frisse energie... En adem krachtig uit door je mond met een 'HA' geluid... laat alle vermoeidheid los... ... Nogmaals... adem vitaliteit en levenskracht in... En adem 'HA' uit... laat traagheid los... Nog een keer... adem kracht en energie in... Adem 'HA' uit... voel je wakkerder worden......",
        
        bodyAwakening: "Laten we nu je lichaam's energie wekken... Begin met je handpalmen krachtig tegen elkaar te wrijven... Voel de warmte en energie opbouwen... Leg je warme handpalmen even over je ogen... ... Tik nu zachtjes over je hele schedel met je vingertoppen... Wek je geest... Masseer je slapen in kleine cirkels... ... Rol je schouders naar achteren... voel je borst openen en uitzetten... Draai je ruggengraat zachtjes links en rechts... Voel energie door je kern stromen......",
        
        energyVisualization: "Stel je een heldere gouden zon voor in het centrum van je borst... Dit is je innerlijke energiebron... Met elke ademhaling wordt deze zon helderder en groter... ... Voel zijn warme stralen door je hele lichaam verspreiden... Omhoog door je borst en schouders... Naar beneden door je armen tot je vingertoppen... die tintelen van energie... ... Het gouden licht stroomt omhoog door je keel en hoofd... Je geest wordt helder en alert... Naar beneden door je buik en heupen... Door je benen... aard je terwijl het je energie geeft... ... Je hele lichaam gloeit met levendige levenskracht......",
        
        affirmations: "Laten we je energie activeren met krachtige affirmaties... 'Ik ben gevuld met levendige energie'... ... 'Mijn lichaam is sterk en levend'... ... 'Ik heb alle energie die ik nodig heb voor mijn dag'... ... 'Ik ben gemotiveerd en klaar voor actie'... ... 'Energie stroomt vrij door me heen'... ... Voel deze woorden elke cel van je lichaam opladen......",
        
        activation: "Laten we deze energie nu verzegelen... Neem drie diepe ademhalingen... maak elke groter dan de vorige... Eerste ademhaling... voel energie opbouwen... Tweede ademhaling... energie uitzetten... Derde ademhaling... houd vast aan de top... voel de energie door je heen pulseren... En laat los met een glimlach... ... Voel je ogen helder en alert... Je geest scherp en gefocust... Je lichaam geënergiseerd en klaar......",
        
        closing: "Terwijl we deze energiegevende meditatie voltooien... Voel de vitaliteit door je aderen stromen... Je bent wakker... alert en volledig opgeladen... ... Begin je lichaam te bewegen zoals het goed voelt... Misschien je armen boven je hoofd strekken... Je nek rollen... Zachtjes op je tenen stuiteren... ... Wanneer je er klaar voor bent... open je ogen wijd... Neem de wereld in met frisse energie... Je bent klaar om je dag met enthousiasme en kracht te omarmen... Ga vooruit en laat je licht schijnen......"
      }
    ]
  },

  // Spanish meditation templates
  es: {
    sleep: [
      {
        name: "Escaneo Corporal para Dormir",
        intro: "Bienvenido a esta meditación pacífica para dormir... Encuentra una posición cómoda en tu cama... permite que tu cuerpo se hunda en el colchón... Cierra los ojos suavemente y comienza a notar tu respiración... No hay nada que necesites hacer ahora... excepto relajarte y escuchar mi voz...",
        
        breathing: "Comencemos con algunas respiraciones calmantes... Respira lentamente por la nariz... cuenta hasta cinco... uno... dos... tres... cuatro... cinco... Mantén la respiración suavemente... uno... dos... tres... cuatro... cinco... Y ahora exhala lentamente por la boca... uno... dos... tres... cuatro... cinco... Deja que tu respiración regrese a su ritmo natural... sintiéndote más relajado con cada respiración......",
        
        bodyRelaxation: "Ahora haremos un suave escaneo corporal para liberar cualquier tensión... Comienza llevando tu atención a tus pies... Siente cómo se vuelven pesados y cálidos... Deja que esa pesadez fluya hacia arriba por tus tobillos... tus pantorrillas... tus rodillas... Siente tus piernas hundiéndose más profundamente en la cama... ... Ahora lleva tu atención a tus caderas y parte baja de la espalda... Deja que se ablanden y se liberen... Siente tu vientre subir y bajar con cada respiración... Tu pecho expandiéndose suavemente... ... Lleva tu conciencia a tus hombros... Deja que caigan lejos de tus oídos... Siente el peso de tus brazos... pesados y relajados... Tus manos descansando pacíficamente... ... Nota tu cuello... Deja que se alargue y se ablande... Tu mandíbula se relaja... Tu rostro se tranquiliza... Incluso los pequeños músculos alrededor de tus ojos se liberan......",
        
        visualization: "Imagínate en un lugar pacífico... Quizás estés acostado en una suave nube... flotando suavemente a través de un cielo estrellado... O tal vez estés descansando en un hermoso jardín... rodeado por el suave aroma de lavanda... El aire tiene la temperatura perfecta... Te sientes completamente seguro y protegido... ... Con cada respiración, te adentras más profundamente en la relajación... Tu mente se vuelve silenciosa y tranquila... como un lago en calma que refleja la luna... Cualquier pensamiento que surja simplemente flota como nubes... No necesitas aferrarte a nada......",
        
        affirmations: "Mientras descansas aquí en perfecta paz... sabe que... Estás seguro... Estás cálido... Estás protegido... Eres amado... ... Tu cuerpo sabe cómo dormir... Es seguro dejarse llevar ahora... Mereces este descanso... Mañana se cuidará de sí mismo... ... En este momento... en este ahora... todo está exactamente como debe estar......",
        
        closing: "Continúa descansando en este estado pacífico... Tu cuerpo está pesado y relajado... Tu mente está calmada y silenciosa... Con cada respiración, te hundes más profundamente en un sueño reparador... ... Te dejo ahora para que te deslices hacia sueños pacíficos... Duerme bien... Descansa profundamente... Y despierta renovado cuando sea el momento... Que tengas dulces sueños......"
      }
    ],

    stress: [
      {
        name: "Alivio del Estrés Mindfulness",
        intro: "Bienvenido a esta meditación para aliviar el estrés... Encuentra una posición cómoda sentado... tu espalda recta pero no rígida... Coloca tus pies planos en el suelo... siente el suelo debajo de ti... Descansa tus manos suavemente en tu regazo... Y cuando estés listo... cierra los ojos o dirige tu mirada suavemente hacia abajo...",
        
        breathing: "Comencemos tomando algunas respiraciones profundas y purificadoras... Respira por la nariz... llenando completamente tus pulmones... Y exhala por la boca... liberando cualquier tensión... ... Otra vez... respira profundamente... sintiendo tu pecho y vientre expandirse... Y exhala... dejando ir el estrés y las preocupaciones... Una vez más... respira energía fresca y calmante... Y exhala todo lo que ya no te sirve......",
        
        bodyAwareness: "Ahora lleva tu atención a tu cuerpo... Nota cualquier área donde estés manteniendo tensión... Tal vez en tus hombros... tu mandíbula... tu vientre... ... Sin tratar de cambiar nada... simplemente nota estas sensaciones... Reconócelas con amabilidad... ... Ahora imagina respirar en estas áreas tensas... Con cada inhalación... envía respiración y espacio a la tensión... Con cada exhalación... siente que la rigidez comienza a ablandarse... ... Continúa con esta respiración suave... adentro... creando espacio... afuera... liberando tensión......",
        
        mindfulness: "Deja que tu atención descanse en el momento presente... Nota la sensación de tu respiración moviéndose dentro y fuera... El suave subir y bajar de tu pecho... ... Cuando surjan pensamientos sobre tu día... y lo harán... simplemente nótalos sin juicio... Como nubes pasando por el cielo... Déjalos pasar... ... Regresa tu atención a tu respiración... Este es tu ancla... Siempre disponible... Siempre presente... ... No hay nada que necesites resolver ahora... Ningún problema que solucionar... Solo esta respiración... luego la siguiente......",
        
        visualization: "Imagina una luz dorada y cálida sobre tu cabeza... Esta es la luz de la paz y la calma... Con cada respiración... esta luz fluye hacia abajo a través de tu cuerpo... ... Fluye a través de tu cabeza... liberando tensión mental... Hacia abajo por tu cuello y hombros... derritiendo el estrés... A través de tu pecho... calmando tu corazón... Hacia abajo por tus brazos hasta las puntas de tus dedos... ... La luz dorada continúa a través de tu vientre... calmando cualquier ansiedad... Hacia abajo por tus caderas y piernas... conectándote a tierra... Hasta tus dedos de los pies... ... Ahora estás lleno de esta luz dorada y pacífica......",
        
        closing: "Mientras preparamos para terminar esta meditación... Sabe que esta sensación de calma siempre está disponible para ti... Solo a unas respiraciones de distancia... ... Comienza a mover tus dedos de manos y pies... Rueda tus hombros suavemente... Y cuando estés listo... abre lentamente los ojos... ... Toma un momento para notar cómo te sientes... Lleva esta paz contigo mientras continúas tu día... Recuerda... puedes regresar a este centro calmado cuando lo necesites... Gracias por tomar este tiempo para ti......"
      }
    ],

    focus: [
      {
        name: "Concentración con Ancla Respiratoria",
        intro: "Bienvenido a esta meditación de concentración y enfoque... Siéntate cómodamente con tu columna erguida y alerta... Descansa tus manos en tus rodillas o en tu regazo... Toma un momento para establecer una intención de claridad y enfoque... Cuando estés listo... cierra suavemente los ojos...",
        
        breathing: "Comienza tomando tres respiraciones profundas y energizantes... Respira por la nariz... llenando tus pulmones con aire fresco... Y exhala completamente por la boca... ... Otra vez... inhala profundamente... sintiéndote alerta y despierto... Exhala completamente... liberando cualquier niebla mental... Una vez más... respira claridad... exhala distracción... ... Ahora deja que tu respiración regrese a lo normal... pero mantén tu atención en cada respiración......",
        
        anchorPractice: "Usaremos tu respiración como ancla para tu atención... Enfócate en la sensación del aire entrando en tus fosas nasales... Fresco al inhalar... Tibio al exhalar... ... Mantén tu atención justo en la punta de tu nariz... Donde primero sientes la respiración... ... Cuando tu mente divague... y lo hará... simplemente nota hacia dónde fue... Luego suavemente... sin juicio... regresa tu atención a la respiración... Esta es la práctica... Notar... Regresar... Una y otra vez......",
        
        affirmations: "Repite mentalmente estas afirmaciones para el enfoque... 'Mi mente está clara y aguda'... ... 'Estoy completamente presente y consciente'... ... 'Mi concentración es fuerte y estable'... ... 'Me enfoco con facilidad y claridad'... ... Deja que estas palabras se hundan profundamente en tu conciencia......",
        
        closing: "Mientras completamos esta meditación... Siente la claridad mejorada en tu mente... Tu capacidad mejorada para enfocarte... ... Comienza a profundizar tu respiración... Mueve tus dedos de manos y pies... Y cuando estés listo... abre los ojos... ... Nota qué tan alerta y enfocado te sientes... Tu mente está clara... aguda y lista... Lleva esta atención enfocada a tu próxima actividad... Estás preparado para trabajar con precisión y claridad......"
      }
    ],

    anxiety: [
      {
        name: "Alivio de Ansiedad con Conexión a Tierra",
        intro: "Bienvenido a esta meditación para aliviar la ansiedad... Encuentra una posición cómoda donde te sientas apoyado y seguro... Puedes poner una mano en tu corazón y otra en tu vientre... Esto te ayuda a sentirte conectado a tierra y conectado contigo mismo... Toma un momento para llegar completamente aquí...",
        
        grounding: "Comencemos conectándonos a tierra en el momento presente... Siente tus pies en el suelo... o tu cuerpo en la silla... Nota cinco cosas que puedes sentir ahora... La temperatura del aire... La textura de tu ropa... El peso de tu cuerpo... ... Esto es real... Esto es ahora... Estás seguro en este momento......",
        
        breathing: "Ahora usemos un patrón de respiración calmante... Respira lentamente durante cuatro cuentas... uno... dos... tres... cuatro... Mantén suavemente durante cuatro... uno... dos... tres... cuatro... Y exhala lentamente durante seis... uno... dos... tres... cuatro... cinco... seis... ... Esta exhalación más larga activa la respuesta de relajación de tu cuerpo... Otra vez... adentro durante cuatro... mantén durante cuatro... afuera durante seis... ... Continúa con este ritmo calmante... sintiéndote más tranquilo con cada ciclo......",
        
        affirmations: "Ofrezcámonos algunas afirmaciones calmantes... 'Estoy seguro en este momento'... ... 'Este sentimiento pasará'... ... 'He sobrevivido a la ansiedad antes y la sobreviviré de nuevo'... ... 'Soy más fuerte que mi ansiedad'... ... 'La paz es mi estado natural'... ... 'Elijo la calma'......",
        
        closing: "Mientras terminamos esta meditación... Recuerda que siempre tienes estas herramientas disponibles... Tu respiración... Tu lugar seguro... Tu fuerza interior... ... Comienza a mover suavemente tu cuerpo... Tal vez estírate un poco... Toma una respiración profunda y abre lentamente los ojos... ... Nota cualquier cambio en cómo te sientes... Incluso un pequeño cambio es significativo... Sé gentil contigo mismo mientras regresas a tu día... Eres valiente... Eres capaz... Y no estás solo......"
      }
    ],

    energy: [
      {
        name: "Energía del Sol Dorado",
        intro: "Bienvenido a esta meditación energizante... Siéntate o párate en una posición que se sienta fuerte y alerta... Imagina una cuerda tirándote hacia arriba desde la corona de tu cabeza... Siente tu columna alargarse... tu pecho abrirse... Estás a punto de despertar tu vitalidad natural...",
        
        breathing: "Comencemos con algunas respiraciones energizantes... Toma una respiración profunda por la nariz... llenando todo tu cuerpo con energía fresca... Y exhala vigorosamente por la boca con un sonido 'HA'... liberando cualquier fatiga... ... Otra vez... respira vitalidad y fuerza vital... Y exhala 'HA'... dejando ir la pereza... Una vez más... inhala poder y energía... Exhala 'HA'... sintiéndote más despierto......",
        
        energyVisualization: "Imagina un sol dorado brillante en el centro de tu pecho... Esta es tu fuente interior de energía... Con cada respiración... este sol se vuelve más brillante y más grande... ... Siente sus rayos cálidos extendiéndose por todo tu cuerpo... Hacia arriba por tu pecho y hombros... Hacia abajo por tus brazos hasta las puntas de tus dedos... que hormiguean con energía... ... La luz dorada fluye hacia arriba por tu garganta y cabeza... Tu mente se vuelve clara y alerta... Hacia abajo por tu vientre y caderas... A través de tus piernas... conectándote a tierra mientras te energiza... ... Todo tu cuerpo brilla con fuerza vital vibrante......",
        
        affirmations: "Activemos tu energía con afirmaciones poderosas... 'Estoy lleno de energía vibrante'... ... 'Mi cuerpo está fuerte y vivo'... ... 'Tengo toda la energía que necesito para mi día'... ... 'Estoy motivado y listo para la acción'... ... 'La energía fluye libremente a través de mí'... ... Siente estas palabras cargando cada célula de tu cuerpo......",
        
        closing: "Mientras completamos esta meditación energizante... Siente la vitalidad corriendo por tus venas... Estás despierto... alerta y completamente cargado... ... Comienza a mover tu cuerpo como se sienta bien... Tal vez estira tus brazos sobre tu cabeza... Rueda tu cuello... Rebota suavemente en tus dedos de los pies... ... Cuando estés listo... abre los ojos ampliamente... Absorbe el mundo con energía fresca... Estás listo para abrazar tu día con entusiasmo y poder... Ve adelante y deja brillar tu luz......"
      }
    ]
  },

  // French meditation templates
  fr: {
    sleep: [
      {
        name: "Scan Corporel pour Dormir",
        intro: "Bienvenue dans cette méditation paisible pour dormir... Trouvez une position confortable dans votre lit... laissez votre corps s'enfoncer dans le matelas... Fermez doucement les yeux et commencez à remarquer votre respiration... Il n'y a rien que vous devez faire maintenant... sauf vous détendre et écouter ma voix...",
        
        breathing: "Commençons par quelques respirations apaisantes... Respirez lentement par le nez... comptez jusqu'à cinq... un... deux... trois... quatre... cinq... Retenez doucement votre souffle... un... deux... trois... quatre... cinq... Et maintenant expirez lentement par la bouche... un... deux... trois... quatre... cinq... Laissez votre respiration revenir à son rythme naturel... vous vous sentez plus détendu à chaque respiration......",
        
        bodyRelaxation: "Maintenant, nous allons faire un doux scan corporel pour relâcher toute tension... Commencez par porter votre attention sur vos pieds... Sentez-les devenir lourds et chauds... Laissez cette lourdeur remonter par vos chevilles... vos mollets... vos genoux... Sentez vos jambes s'enfoncer plus profondément dans le lit... ... Maintenant, portez votre attention sur vos hanches et le bas de votre dos... Laissez-les s'adoucir et se relâcher... Sentez votre ventre monter et descendre à chaque respiration... Votre poitrine s'expandant doucement... ... Amenez votre conscience à vos épaules... Laissez-les tomber loin de vos oreilles... Sentez le poids de vos bras... lourds et détendus... Vos mains reposant paisiblement... ... Remarquez votre cou... Laissez-le s'allonger et s'adoucir... Votre mâchoire se détend... Votre visage devient paisible... Même les petits muscles autour de vos yeux se relâchent......",
        
        visualization: "Imaginez-vous dans un lieu paisible... Peut-être êtes-vous allongé sur un nuage doux... flottant doucement à travers un ciel étoilé... Ou peut-être vous reposez-vous dans un beau jardin... entouré par le doux parfum de la lavande... L'air a la température parfaite... Vous vous sentez complètement en sécurité et protégé... ... À chaque respiration, vous dérivez plus profondément dans la relaxation... Votre esprit devient silencieux et tranquille... comme un lac calme reflétant la lune... Toute pensée qui surgit flotte simplement comme des nuages... Vous n'avez besoin de vous accrocher à rien......",
        
        affirmations: "Alors que vous reposez ici dans une paix parfaite... sachez que... Vous êtes en sécurité... Vous êtes au chaud... Vous êtes protégé... Vous êtes aimé... ... Votre corps sait comment dormir... Il est sûr de lâcher prise maintenant... Vous méritez ce repos... Demain prendra soin de lui-même... ... En ce moment... dans cet instant... tout est exactement comme cela devrait être......",
        
        closing: "Continuez à vous reposer dans cet état paisible... Votre corps est lourd et détendu... Votre esprit est calme et silencieux... À chaque respiration, vous sombrez plus profondément dans un sommeil réparateur... ... Je vous laisse maintenant dériver vers des rêves paisibles... Dormez bien... Reposez-vous profondément... Et réveillez-vous rafraîchi quand ce sera le moment... Doux rêves......"
      }
    ],

    stress: [
      {
        name: "Soulagement du Stress Pleine Conscience",
        intro: "Bienvenue dans cette méditation pour soulager le stress... Trouvez une position assise confortable... votre dos droit mais pas rigide... Placez vos pieds à plat sur le sol... sentez le sol sous vous... Posez vos mains doucement sur vos genoux... Et quand vous êtes prêt... fermez les yeux ou dirigez doucement votre regard vers le bas...",
        
        breathing: "Commençons par prendre quelques respirations profondes et purifiantes... Respirez par le nez... remplissant complètement vos poumons... Et expirez par la bouche... relâchant toute tension... ... Encore une fois... respirez profondément... sentant votre poitrine et votre ventre s'expandre... Et expirez... laissant partir le stress et les inquiétudes... Une fois de plus... respirez de l'énergie fraîche et apaisante... Et expirez tout ce qui ne vous sert plus......",
        
        mindfulness: "Laissez votre attention se poser sur le moment présent... Remarquez la sensation de votre respiration qui entre et sort... Le doux mouvement de montée et descente de votre poitrine... ... Quand des pensées sur votre journée surgissent... et elles le feront... remarquez-les simplement sans jugement... Comme des nuages passant dans le ciel... Laissez-les dériver... ... Ramenez votre attention à votre respiration... C'est votre ancre... Toujours disponible... Toujours présente... ... Il n'y a rien que vous devez résoudre maintenant... Aucun problème à résoudre... Juste cette respiration... puis la suivante......",
        
        closing: "Alors que nous nous préparons à terminer cette méditation... Sachez que cette sensation de calme est toujours disponible pour vous... À seulement quelques respirations... ... Commencez à bouger vos doigts et orteils... Roulez doucement vos épaules... Et quand vous êtes prêt... ouvrez lentement les yeux... ... Prenez un moment pour remarquer comment vous vous sentez... Portez cette paix avec vous alors que vous continuez votre journée... Rappelez-vous... vous pouvez toujours revenir à ce centre calme quand vous en avez besoin... Merci d'avoir pris ce temps pour vous......"
      }
    ],

    focus: [
      {
        name: "Concentration avec Ancre Respiratoire",
        intro: "Bienvenue dans cette méditation de concentration et de focus... Asseyez-vous confortablement avec votre colonne vertébrale droite et alerte... Posez vos mains sur vos genoux ou dans votre giron... Prenez un moment pour établir une intention de clarté et de focus... Quand vous êtes prêt... fermez doucement les yeux...",
        
        breathing: "Commencez par prendre trois respirations profondes et énergisantes... Respirez par le nez... remplissant vos poumons d'air frais... Et expirez complètement par la bouche... ... Encore une fois... inhalez profondément... vous sentant alerte et éveillé... Expirez complètement... relâchant tout brouillard mental... Une fois de plus... respirez la clarté... expirez la distraction... ... Maintenant, laissez votre respiration revenir à la normale... mais gardez votre attention sur chaque respiration......",
        
        affirmations: "Répétez mentalement ces affirmations pour la concentration... 'Mon esprit est clair et vif'... ... 'Je suis complètement présent et conscient'... ... 'Ma concentration est forte et stable'... ... 'Je me concentre avec facilité et clarté'... ... Laissez ces mots s'enfoncer profondément dans votre conscience......",
        
        closing: "Alors que nous terminons cette méditation... Sentez la clarté améliorée dans votre esprit... Votre capacité améliorée à vous concentrer... ... Commencez à approfondir votre respiration... Bougez vos doigts et orteils... Et quand vous êtes prêt... ouvrez les yeux... ... Remarquez à quel point vous vous sentez alerte et concentré... Votre esprit est clair... vif et prêt... Portez cette attention focalisée dans votre prochaine activité... Vous êtes préparé à travailler avec précision et clarté......"
      }
    ],

    anxiety: [
      {
        name: "Soulagement de l'Anxiété par l'Ancrage",
        intro: "Bienvenue dans cette méditation pour soulager l'anxiété... Trouvez une position confortable où vous vous sentez soutenu et en sécurité... Vous pouvez placer une main sur votre cœur et une sur votre ventre... Cela vous aide à vous sentir ancré et connecté à vous-même... Prenez un moment pour arriver complètement ici...",
        
        grounding: "Commençons par nous ancrer dans le moment présent... Sentez vos pieds sur le sol... ou votre corps dans la chaise... Remarquez cinq choses que vous pouvez sentir maintenant... La température de l'air... La texture de vos vêtements... Le poids de votre corps... ... C'est réel... C'est maintenant... Vous êtes en sécurité dans ce moment......",
        
        affirmations: "Offrons-nous quelques affirmations apaisantes... 'Je suis en sécurité dans ce moment'... ... 'Ce sentiment passera'... ... 'J'ai survécu à l'anxiété avant et je la survivrai encore'... ... 'Je suis plus fort que mon anxiété'... ... 'La paix est mon état naturel'... ... 'Je choisis le calme'......",
        
        closing: "Alors que nous terminons cette méditation... Rappelez-vous que vous avez toujours ces outils disponibles... Votre respiration... Votre lieu sûr... Votre force intérieure... ... Commencez à bouger doucement votre corps... Peut-être vous étirer un peu... Prenez une respiration profonde et ouvrez lentement les yeux... ... Remarquez tout changement dans ce que vous ressentez... Même un petit changement est significatif... Soyez doux avec vous-même alors que vous retournez à votre journée... Vous êtes courageux... Vous êtes capable... Et vous n'êtes pas seul......"
      }
    ],

    energy: [
      {
        name: "Énergie du Soleil Doré",
        intro: "Bienvenue dans cette méditation énergisante... Asseyez-vous ou tenez-vous dans une position qui se sent forte et alerte... Imaginez une corde vous tirant vers le haut depuis le sommet de votre tête... Sentez votre colonne vertébrale s'allonger... votre poitrine s'ouvrir... Vous êtes sur le point d'éveiller votre vitalité naturelle...",
        
        breathing: "Commençons par quelques respirations énergisantes... Prenez une respiration profonde par le nez... remplissant tout votre corps d'énergie fraîche... Et expirez vigoureusement par la bouche avec un son 'HA'... relâchant toute fatigue... ... Encore une fois... respirez vitalité et force vitale... Et expirez 'HA'... laissant partir la paresse... Une fois de plus... inhalez puissance et énergie... Expirez 'HA'... vous sentant plus éveillé......",
        
        affirmations: "Activons votre énergie avec des affirmations puissantes... 'Je suis rempli d'énergie vibrante'... ... 'Mon corps est fort et vivant'... ... 'J'ai toute l'énergie dont j'ai besoin pour ma journée'... ... 'Je suis motivé et prêt à l'action'... ... 'L'énergie coule librement à travers moi'... ... Sentez ces mots charger chaque cellule de votre corps......",
        
        closing: "Alors que nous terminons cette méditation énergisante... Sentez la vitalité couler dans vos veines... Vous êtes éveillé... alerte et complètement chargé... ... Commencez à bouger votre corps comme cela vous fait du bien... Peut-être étirer vos bras au-dessus de votre tête... Rouler votre cou... Rebondir doucement sur vos orteils... ... Quand vous êtes prêt... ouvrez grand les yeux... Prenez le monde avec une énergie fraîche... Vous êtes prêt à embrasser votre journée avec enthousiasme et puissance... Allez-y et laissez briller votre lumière......"
      }
    ]
  },

  // German meditation templates
  de: {
    sleep: [
      {
        name: "Körperreise zum Einschlafen",
        intro: "Willkommen zu dieser friedlichen Einschlafmeditation... Finde eine bequeme Position in deinem Bett... lass deinen Körper tief in die Matratze sinken... Schließe sanft die Augen und beginne deinen Atem zu bemerken... Du musst jetzt nichts tun... außer entspannen und meiner Stimme zu lauschen...",
        
        breathing: "Beginnen wir mit einigen beruhigenden Atemzügen... Atme langsam durch die Nase ein... zähle bis fünf... eins... zwei... drei... vier... fünf... Halte den Atem sanft an... eins... zwei... drei... vier... fünf... Und nun langsam durch den Mund ausatmen... eins... zwei... drei... vier... fünf... Lass deine Atmung zu ihrem natürlichen Rhythmus zurückkehren... du fühlst dich entspannter mit jedem Atemzug......",
        
        bodyRelaxation: "Nun machen wir eine sanfte Körperreise um alle Anspannungen loszulassen... Beginne mit deiner Aufmerksamkeit bei den Füßen... Spüre wie sie schwer und warm werden... Lass diese Schwere durch deine Knöchel aufsteigen... deine Waden... deine Knie... Spüre wie deine Beine tiefer ins Bett sinken... ... Bringe nun deine Aufmerksamkeit zu deinen Hüften und dem unteren Rücken... Lass sie weich werden und loslassen... Spüre wie dein Bauch mit jedem Atemzug auf und ab geht... Deine Brust dehnt sich sanft aus... ... Bringe dein Bewusstsein zu deinen Schultern... Lass sie von den Ohren wegfallen... Spüre das Gewicht deiner Arme... schwer und entspannt... Deine Hände ruhen friedlich... ... Bemerke deinen Nacken... Lass ihn länger werden und weicher... Dein Kiefer entspannt sich... Dein Gesicht wird ruhig... Selbst die kleinen Muskeln um deine Augen lassen los......",
        
        visualization: "Stelle dir einen friedlichen Ort vor... Vielleicht liegst du auf einer weichen Wolke... schwebst sanft durch einen Sternenhimmel... Oder du ruhst in einem wunderschönen Garten... umgeben vom sanften Duft von Lavendel... Die Luft hat die perfekte Temperatur... Du fühlst dich vollkommen sicher und beschützt... ... Mit jedem Atemzug treibst du tiefer in die Entspannung... Dein Geist wird still und ruhig... wie ein ruhiger See der den Mond widerspiegelt... Gedanken die aufkommen treiben einfach vorbei wie Wolken... Du musst an nichts festhalten......",
        
        affirmations: "Während du hier in vollkommenem Frieden ruhst... wisse dass... Du bist sicher... Du bist warm... Du bist beschützt... Du bist geliebt... ... Dein Körper weiß wie er schlafen soll... Es ist sicher jetzt loszulassen... Du verdienst diese Ruhe... Morgen wird für sich sorgen... ... In diesem Moment... in diesem Jetzt... ist alles genau so wie es sein sollte......",
        
        closing: "Bleibe weiterhin in diesem friedlichen Zustand... Dein Körper ist schwer und entspannt... Dein Geist ist ruhig und still... Mit jedem Atemzug sinkst du tiefer in erholsamen Schlaf... ... Ich lasse dich nun in friedliche Träume gleiten... Schlaf gut... Ruhe tief... Und erwache erfrischt wenn es Zeit ist... Süße Träume......"
      },
      
      {
        name: "Atemmeditation zum Einschlafen",
        intro: "Willkommen zu dieser Atemmeditation zum Einschlafen... Mache es dir in deinem Bett bequem... schließe die Augen und spüre die Ruhe des Abends... Dein Atem wird dich sanft in den Schlaf führen...",
        
        breathing: "Beginne damit einfach deinen natürlichen Atem zu beobachten... Spüre wie die Luft durch deine Nase einströmt... kühl beim Einatmen... warm beim Ausatmen... ... Atme nun etwas tiefer... durch die Nase ein... und durch den Mund aus... Lass jeden Ausatem die Anspannung des Tages fortragen... ... Einatmen... Ruhe und Frieden... Ausatmen... Stress und Sorgen... ... Finde deinen eigenen Rhythmus... Ein... und aus... Ein... und aus... Jeder Atemzug bringt dich dem Schlaf näher......",
        
        bodyAwareness: "Während du weiter atmest... spüre deinen Körper im Bett... Dein Kopf sinkt ins Kissen... Deine Schultern werden schwer... Deine Arme ruhen entspannt... ... Dein Rücken wird vom Bett getragen... Deine Hüften sinken ein... Deine Beine werden schwer wie Blei... Deine Füße sind völlig entspannt... ... Mit jedem Atemzug wirst du schwerer... entspannter... müder... Dein ganzer Körper bereitet sich auf den Schlaf vor......",
        
        countingBreath: "Nun zählen wir die Atemzüge... Einatmen... eins... Ausatmen... zwei... Einatmen... drei... Ausatmen... vier... ... Zähle weiter bis zehn... dann beginne wieder bei eins... Wenn du die Zahl verlierst... kein Problem... beginne einfach wieder bei eins... ... Diese Zählung hilft dem Geist zur Ruhe zu kommen... Eins... zwei... drei... vier... der Schlaf kommt näher......",
        
        closing: "Lass das Zählen nun los... Atme einfach natürlich... Spüre wie müde und schwer dein Körper geworden ist... Dein Geist ist ruhig und friedlich... ... Du bist bereit für einen tiefen... erholsamen Schlaf... Schlafe nun ein... lass los... und träume süß... Gute Nacht......"
      }
    ],

    stress: [
      {
        name: "Achtsamkeit gegen Stress",
        intro: "Willkommen zu dieser Achtsamkeitsmeditation gegen Stress... Setze dich bequem hin... dein Rücken aufrecht aber nicht steif... Stelle deine Füße flach auf den Boden... spüre den Boden unter dir... Lege deine Hände sanft auf die Oberschenkel... Wenn du bereit bist... schließe die Augen oder senke den Blick sanft nach unten...",
        
        breathing: "Beginnen wir mit einigen tiefen reinigenden Atemzügen... Atme durch die Nase ein... fülle deine Lungen vollständig... Und atme durch den Mund aus... lass alle Anspannung los... ... Noch einmal... atme tief ein... spüre wie sich Brust und Bauch weiten... Und atme aus... lass Stress und Sorgen los... Ein letztes Mal... atme frische beruhigende Energie ein... Und atme alles aus was dir nicht mehr dient......",
        
        bodyAwareness: "Bringe nun deine Aufmerksamkeit zu deinem Körper... Bemerke Bereiche wo du Spannung hältst... Vielleicht in den Schultern... dem Kiefer... dem Bauch... ... Ohne etwas zu verändern... nimm diese Empfindungen einfach wahr... Erkenne sie mit Freundlichkeit an... ... Stelle dir nun vor du atmest in diese verspannten Bereiche... Mit jedem Einatmen sendest du Atem und Raum zur Spannung... Mit jedem Ausatmen spürst du wie die Steifheit weicher wird... ... Setze diese sanfte Atmung fort... ein... Raum schaffen... aus... Spannung loslassen......",
        
        mindfulness: "Lass deine Aufmerksamkeit im gegenwärtigen Moment ruhen... Bemerke das Gefühl deines Atems der ein und aus geht... Das sanfte Heben und Senken deiner Brust... ... Wenn Gedanken über deinen Tag aufkommen... und das werden sie... bemerke sie einfach ohne zu urteilen... Wie Wolken die am Himmel vorbeiziehen... Lass sie vorbeidriften... ... Kehre zu deinem Atem zurück... Das ist dein Anker... Immer verfügbar... Immer gegenwärtig... ... Es gibt nichts was du jetzt herausfinden musst... Keine Probleme zu lösen... Nur dieser Atemzug... dann der nächste......",
        
        visualization: "Stelle dir ein warmes goldenes Licht über deinem Kopf vor... Das ist das Licht des Friedens und der Ruhe... Mit jedem Atemzug fließt dieses Licht durch deinen Körper nach unten... ... Es fließt durch deinen Kopf... löst mentale Anspannung... Hinunter durch Nacken und Schultern... schmilzt Stress weg... Durch deine Brust... beruhigt dein Herz... Hinunter durch deine Arme zu den Fingerspitzen... ... Das goldene Licht setzt sich durch deinen Bauch fort... beruhigt jede Angst... Hinunter durch Hüften und Beine... erdet dich... Bis zu deinen Zehen... ... Du bist nun erfüllt von diesem friedlichen goldenen Licht......",
        
        closing: "Während wir uns darauf vorbereiten diese Meditation zu beenden... Wisse dass dieses Gefühl der Ruhe immer für dich verfügbar ist... Nur wenige Atemzüge entfernt... ... Beginne deine Finger und Zehen zu bewegen... Rolle deine Schultern sanft... Und wenn du bereit bist... öffne langsam die Augen... ... Nimm dir einen Moment um zu bemerken wie du dich fühlst... Nimm diesen Frieden mit dir während du deinen Tag fortsetzt... Erinnere dich... du kannst immer zu diesem ruhigen Zentrum zurückkehren wenn du es brauchst... Danke dass du dir diese Zeit für dich genommen hast......"
      }
    ],

    focus: [
      {
        name: "Atemfokus Konzentration",
        intro: "Willkommen zu dieser Konzentrations- und Fokusmeditation... Setze dich bequem hin mit aufrechter und wacher Wirbelsäule... Lege deine Hände auf die Knie oder in den Schoß... Nimm dir einen Moment um eine Absicht für Klarheit und Fokus zu setzen... Wenn du bereit bist... schließe sanft die Augen...",
        
        breathing: "Beginne mit drei tiefen energetisierenden Atemzügen... Atme durch die Nase ein... fülle deine Lungen mit frischer Luft... Und atme vollständig durch den Mund aus... ... Noch einmal... atme tief ein... fühlst dich wach und aufmerksam... Atme vollständig aus... lass jeden mentalen Nebel los... Ein letztes Mal... atme Klarheit ein... atme Ablenkung aus... ... Lass deine Atmung nun normal werden... aber behalte deine Aufmerksamkeit bei jedem Atemzug......",
        
        anchorPractice: "Wir nutzen deinen Atem als Anker für deine Aufmerksamkeit... Fokussiere dich auf das Gefühl der Luft die in deine Nasenlöcher einströmt... Kühl beim Einatmen... Warm beim Ausatmen... ... Halte deine Aufmerksamkeit genau an der Nasenspitze... Wo du den Atem zuerst spürst... ... Wenn dein Geist wandert... und das wird er... bemerke einfach wohin er ging... Dann bringe sanft und ohne Urteil deine Aufmerksamkeit zurück zum Atem... Das ist die Übung... Bemerken... Zurückkehren... Immer wieder......",
        
        affirmations: "Wiederhole diese Affirmationen für den Fokus mental... 'Mein Geist ist klar und scharf'... ... 'Ich bin vollständig präsent und bewusst'... ... 'Meine Konzentration ist stark und stabil'... ... 'Ich fokussiere mich mit Leichtigkeit und Klarheit'... ... Lass diese Worte tief in dein Bewusstsein sinken......",
        
        closing: "Während wir diese Meditation beenden... Spüre die verbesserte Klarheit in deinem Geist... Deine verbesserte Fähigkeit dich zu fokussieren... ... Beginne deine Atmung zu vertiefen... Bewege deine Finger und Zehen... Und wenn du bereit bist... öffne die Augen... ... Bemerke wie wach und fokussiert du dich fühlst... Dein Geist ist klar... scharf und bereit... Nimm diese fokussierte Aufmerksamkeit mit in deine nächste Aktivität... Du bist vorbereitet mit Präzision und Klarheit zu arbeiten......"
      }
    ],

    anxiety: [
      {
        name: "Erdung bei Angst",
        intro: "Willkommen zu dieser Meditation zur Angstlinderung... Finde eine bequeme Position in der du dich unterstützt und sicher fühlst... Du kannst eine Hand auf dein Herz legen und eine auf deinen Bauch... Das hilft dir dich geerdet und mit dir selbst verbunden zu fühlen... Nimm dir einen Moment um vollständig hier anzukommen...",
        
        grounding: "Beginnen wir damit uns im gegenwärtigen Moment zu erden... Spüre deine Füße auf dem Boden... oder deinen Körper im Stuhl... Bemerke fünf Dinge die du jetzt fühlen kannst... Die Temperatur der Luft... Die Textur deiner Kleidung... Das Gewicht deines Körpers... ... Das ist real... Das ist jetzt... Du bist sicher in diesem Moment......",
        
        breathing: "Nun nutzen wir ein beruhigendes Atemmuster... Atme langsam vier Zählzeiten ein... eins... zwei... drei... vier... Halte sanft vier Zählzeiten... eins... zwei... drei... vier... Und atme langsam sechs Zählzeiten aus... eins... zwei... drei... vier... fünf... sechs... ... Dieses längere Ausatmen aktiviert die Entspannungsreaktion deines Körpers... Noch einmal... ein für vier... halten für vier... aus für sechs... ... Setze diesen beruhigenden Rhythmus fort... fühlst dich ruhiger mit jedem Zyklus......",
        
        affirmations: "Geben wir uns selbst einige beruhigende Affirmationen... 'Ich bin sicher in diesem Moment'... ... 'Dieses Gefühl wird vergehen'... ... 'Ich habe Angst schon früher überlebt und werde es wieder schaffen'... ... 'Ich bin stärker als meine Angst'... ... 'Frieden ist mein natürlicher Zustand'... ... 'Ich wähle die Ruhe'......",
        
        closing: "Während wir diese Meditation beenden... Erinnere dich dass du diese Werkzeuge immer zur Verfügung hast... Deinen Atem... Deinen sicheren Ort... Deine innere Stärke... ... Beginne deinen Körper sanft zu bewegen... Vielleicht dich ein wenig zu strecken... Atme tief ein und öffne langsam die Augen... ... Bemerke jede Veränderung in dem wie du dich fühlst... Selbst eine kleine Veränderung ist bedeutsam... Sei sanft zu dir selbst während du zu deinem Tag zurückkehrst... Du bist mutig... Du bist fähig... Und du bist nicht allein......"
      }
    ],

    energy: [
      {
        name: "Goldene Sonnen Energie",
        intro: "Willkommen zu dieser energetisierenden Meditation... Setze oder stelle dich in eine Position die sich stark und wach anfühlt... Stelle dir eine Schnur vor die dich von der Krone deines Kopfes nach oben zieht... Spüre wie sich deine Wirbelsäule verlängert... deine Brust öffnet... Du bist dabei deine natürliche Vitalität zu erwecken...",
        
        breathing: "Beginnen wir mit einigen energetisierenden Atemzügen... Atme tief durch die Nase ein... fülle deinen ganzen Körper mit frischer Energie... Und atme kräftig durch den Mund aus mit einem 'HA' Laut... lass alle Müdigkeit los... ... Noch einmal... atme Vitalität und Lebenskraft ein... Und atme 'HA' aus... lass Trägheit los... Ein letztes Mal... atme Kraft und Energie ein... Atme 'HA' aus... fühlst dich wacher......",
        
        energyVisualization: "Stelle dir eine helle goldene Sonne im Zentrum deiner Brust vor... Das ist deine innere Energiequelle... Mit jedem Atemzug wird diese Sonne heller und größer... ... Spüre ihre warmen Strahlen die sich durch deinen ganzen Körper ausbreiten... Nach oben durch Brust und Schultern... Nach unten durch deine Arme zu den Fingerspitzen... die vor Energie kribbeln... ... Das goldene Licht fließt nach oben durch Hals und Kopf... Dein Geist wird klar und wach... Nach unten durch Bauch und Hüften... Durch deine Beine... erdet dich während es dich energetisiert... ... Dein ganzer Körper strahlt mit lebendiger Lebenskraft......",
        
        affirmations: "Aktivieren wir deine Energie mit kraftvollen Affirmationen... 'Ich bin erfüllt von lebendiger Energie'... ... 'Mein Körper ist stark und lebendig'... ... 'Ich habe alle Energie die ich für meinen Tag brauche'... ... 'Ich bin motiviert und bereit für Handlung'... ... 'Energie fließt frei durch mich'... ... Spüre wie diese Worte jede Zelle deines Körpers aufladen......",
        
        closing: "Während wir diese energetisierende Meditation beenden... Spüre die Vitalität die durch deine Adern fließt... Du bist wach... aufmerksam und vollständig aufgeladen... ... Beginne deinen Körper zu bewegen wie es sich gut anfühlt... Vielleicht strecke deine Arme über den Kopf... Rolle deinen Nacken... Hüpfe sanft auf den Zehenspitzen... ... Wenn du bereit bist... öffne die Augen weit... Nimm die Welt mit frischer Energie auf... Du bist bereit deinen Tag mit Enthusiasmus und Kraft zu umarmen... Geh hinaus und lass dein Licht leuchten......"
      }
    ]
  }
};

// Function to generate a complete meditation based on type and duration
function generateMeditation(type, durationMinutes, language = 'en') {
  const languageTemplates = meditationTemplates[language];
  if (!languageTemplates) {
    console.log(`Language ${language} not available. Using English.`);
    language = 'en';
  }

  const typeTemplates = meditationTemplates[language][type];
  if (!typeTemplates || !Array.isArray(typeTemplates) || typeTemplates.length === 0) {
    throw new Error(`Unknown meditation type: ${type} for language: ${language}`);
  }

  // Select a random template variation
  const template = typeTemplates[Math.floor(Math.random() * typeTemplates.length)];

  let meditation = '';
  
  // Always include intro
  meditation += template.intro + '\n\n';
  
  // Add sections based on duration
  if (durationMinutes <= 3) {
    // Short version: intro + breathing + main practice + closing
    meditation += template.breathing + '\n\n';
    const sections = Object.keys(template).filter(key => key !== 'intro' && key !== 'name' && key !== 'closing');
    if (sections.length > 1) {
      meditation += template[sections[1]] + '\n\n'; // Main practice (varies by type)
    }
    meditation += template.closing;
  } else if (durationMinutes <= 5) {
    // Medium version: all sections but shortened
    Object.keys(template).forEach(section => {
      if (section !== 'intro' && section !== 'name' && section !== 'closing') {
        meditation += template[section] + '\n\n';
      }
    });
    meditation += template.closing;
  } else if (durationMinutes <= 10) {
    // Long version: all sections with repetition
    Object.keys(template).forEach((section, index) => {
      if (section !== 'intro' && section !== 'name' && section !== 'closing') {
        meditation += template[section] + '\n\n';
        // Add extra pause between major sections
        if (index < Object.keys(template).length - 2) {
          meditation += '......\n\n';
        }
      }
    });
    meditation += template.closing;
  } else {
    // Very long version: repeat main sections
    const sections = Object.keys(template).filter(key => key !== 'intro' && key !== 'name' && key !== 'closing');
    
    // Add breathing first
    if (template.breathing) {
      meditation += template.breathing + '\n\n......\n\n';
    }
    
    // Repeat middle sections for longer meditations
    const repeatSections = Math.floor((durationMinutes - 5) / 5);
    const mainSections = sections.filter(section => section !== 'breathing');
    
    for (let i = 0; i < repeatSections + 1; i++) {
      mainSections.forEach(section => {
        meditation += template[section] + '\n\n';
        if (i < repeatSections) {
          meditation += '......\n\n';
        }
      });
    }
    
    meditation += template.closing;
  }
  
  return meditation.trim();
}

module.exports = {
  meditationTemplates,
  generateMeditation
};