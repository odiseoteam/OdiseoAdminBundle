<?php

namespace Odiseo\Bundle\AdminBundle\Entity;

use Sylius\Component\User\Model\User;

/**
 * AdminUser
 */
class AdminUser extends User implements AdminUserInterface
{
    /**
     * @inheritdoc
     */
    public function setEmail(?string $email): void
    {
        parent::setEmail($email);

        $this->setUsername($email);
        $this->setUsernameCanonical($email);
        $this->setEmailCanonical($email);
    }
}