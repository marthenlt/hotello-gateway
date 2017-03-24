package com.hotello.housekeeping.schedule.ui.repository;

import com.hotello.housekeeping.schedule.ui.domain.Authority;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Authority entity.
 */
public interface AuthorityRepository extends MongoRepository<Authority, String> {
}
